// DOMUSTO
import config from '../../config';
import DomustoPlugin from '../../domusto/DomustoPlugin';
import DomustoSignalHub from '../../domusto/DomustoSignalHub';
import DomustoDevicesManager from '../../domusto/DomustoDevicesManager';

// INTERFACES
import { Domusto } from '../../domusto/DomustoTypes';

// PLUGIN SPECIFIC
let AVReceiver = require('marantz-avr');

/**
 * Marantz plugin for DOMUSTO Home Automation
 * @author Bas van Dijk
 * @version 0.0.1
 *
 * @class DomustoMarantz
 * @extends {DomustoPlugin}
 */
class DomustoMarantz extends DomustoPlugin {

    /**
     * Creates an instance of DomustoMarantz.
     * @param {any} Plugin configuration as defined in the config.js file
     * @memberof DomustoMarantz
     */

    constructor(pluginConfiguration: Domusto.PluginConfiguration) {

        super({
            plugin: 'Marantz-avr remote',
            author: 'Bas van Dijk',
            category: Domusto.PluginCategories.audio,
            version: '0.0.1',
            website: 'http://domusto.com'
        });

        this.pluginConfiguration = pluginConfiguration;

        const isConfigurationValid = this.validateConfigurationAttributes(pluginConfiguration.settings, [
            {
                attribute: 'ip',
                type: /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/
            }
        ]);

        if (isConfigurationValid) {

            // Initialize hardware plugin
            const receiver = new AVReceiver(pluginConfiguration.settings.ip);
            this.hardwareInstance = receiver;

            // Poll current receiver status
            this.refreshReceiverStatus();

            // Start polling receiver on interval
            setInterval(() => this.refreshReceiverStatus(), pluginConfiguration.settings.pollInterval | 10000);

            this.console.header(`${pluginConfiguration.id} plugin ready for sending / receiving data`);

        }

    }

    onSignalReceivedForPlugin(signal: Domusto.Signal) {

        const pluginDevice = signal.deviceId.split('-')[0];
        const pluginDeviceValue = signal.deviceId.split('-')[1];

        switch (pluginDevice) {

            case 'power':

                this.hardwareInstance.setPowerState(signal.data['state'] === 'on').then(res => {
                    this.broadcastSignal('power', {
                        state: signal.data['state']
                    });
                }, error => this.console.error(error));
                break;

            case 'source':
                this.hardwareInstance.setInputSource(pluginDeviceValue).then(res => {
                }, error => this.console.error(error));
                break;

            case 'mute':

                this.hardwareInstance.setMuteState(signal.data['state'] === 'on').then(res => {
                    this.broadcastSignal('mute', {
                        state: signal.data['state']
                    });
                }, error => this.console.error(error));
                break;

            case 'volume':

                switch (signal.data['state']) {
                    case 'off':
                        this.hardwareInstance.volumeUp().then(res => {
                            this.broadcastSignal('volume', {
                                state: signal.data['state']
                            });
                        }, error => this.console.error(error));
                        break;

                    case 'on':
                        this.hardwareInstance.volumeDown().then(res => {
                            this.broadcastSignal('volume', {
                                state: signal.data['state']
                            });
                        }, error => this.console.error(error));
                        break;
                }

                break;

        }
    }

    /**
     * Polls the receiver and broadcast the status to the Signal Hub
     *
     * @memberof DomustoMarantz
     */
    refreshReceiverStatus() {

         this.hardwareInstance.getState().then(
            res => {

                this.broadcastSignal('power', {
                    state: res.power ? 'on' : 'off'
                });

                this.broadcastSignal('input', {
                    state: res.input
                });

                this.broadcastSignal('volume', {
                    state: res.volumeLevel
                });

                this.broadcastSignal('mute', {
                    state: res.mute ? 'on' : 'off'
                });

                this.broadcastSignal('surroundMode', {
                    state: res.surroundMode
                });
            },
            error => this.console.error(error)
        );

    }

}

export default DomustoMarantz;