// import { Domusto } from "domusto-types";

// import util from '../../util';
// import config from '../../config';

// // DOMUSTO
// import DomustoPlugin from '../../domusto/DomustoPlugin';
// import DomustoEmitter from '../../domusto/DomustoEmitter';

// INTERFACES
// import { PluginCategories } from 'domusto-typings';
// import { Domusto } from 'domusto-types';

// PLUGIN SPECIFIC
let AVReceiver = require('marantz-avr');

// import DomustoPlugin from 'domusto-server/src/domusto/DomustoPlugin';
// import DomustoPlugin from 'domusto-server/src/domusto/DomustoPlugin';
// import { Domusto } from 'domusto-types';
// import { PluginCategories } from 'domusto-types';
// import pluginConfiguration from 'domusto-server/src/domusto/interfaces/';

/**
 * GPIO plugin for DOMUSTO
 * @author Bas van Dijk
 * @version 0.0.1
 *
 * @class DomustoMarantz
 * @extends {DomustoPlugin}
 */
class DomustoMarantz {
// class DomustoMarantz extends DomustoPlugin {

    domustoPlugin;

    /**
     * Creates an instance of DomustoMarantz.
     * @param {any} Plugin configuration as defined in the config.js file
     * @memberof DomustoMarantz
     */
    constructor(pluginConfiguration, domustoPlugin) {

        console.log(__filename);

        this.domustoPlugin = new domustoPlugin({
            plugin: 'Marantz-avr remote',
            author: 'Bas van Dijk',
            category: 'audio',
            version: '0.0.1',
            website: 'http://domusto.com'
        });

        this.domustoPlugin.pluginConfiguration = pluginConfiguration;

        console.log('pluginConfiguration', pluginConfiguration);

        let receiver = new AVReceiver(pluginConfiguration.settings.ip);
        this.domustoPlugin.hardwareInstance = receiver;

        receiver.getState().then(
            res => console.log(res),
            error => console.log(error)
        );

        // this.refreshReceiverStatus();


    }

    // refreshReceiverStatus() {

    //     this.onNewInputData({
    //         pluginId: this._pluginConfiguration.type,
    //         deviceId: 'mute',
    //         command: 'on'
    //     });

    // }

    outputCommand(device, command, onSucces) {

        console.log('Marantz output', command);

        switch (device.protocol.outputId) {

            case 'power':

                this.domustoPlugin.hardwareInstance.setPowerState(command === 'on').then(res => {
                    onSucces({ state: command === 'on' ? 'on' : 'off' });
                }, error => console.log(error));
                break;

            case 'source':

                this.domustoPlugin.hardwareInstance.setInputSource(device.protocol.subType).then(res => {
                    // onSucces();
                }, error => console.log(error));
                break;

            case 'mute':

                this.domustoPlugin.hardwareInstance.setMuteState(command === 'on').then(res => {
                    onSucces({ state: command === 'on' ? 'on' : 'off' });
                }, error => console.log(error));
                break;

            case 'volume':

                switch (command) {
                    case 'off':
                        this.domustoPlugin.hardwareInstance.volumeUp().then(res => {
                            onSucces({ state: command === 'on' ? 'on' : 'off' });
                        }, error => console.log(error));
                        break;
                    case 'on':
                        this.domustoPlugin.hardwareInstance.volumeDown().then(res => {
                            onSucces({ state: command === 'on' ? 'on' : 'off' });
                        }, error => console.log(error));
                        break;
                }

                break;

        }

    }

    // toString() {
    //     return super.toString();
    // }
}

export default DomustoMarantz;