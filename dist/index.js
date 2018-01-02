"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domusto_types_1 = require("domusto-types");
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
            category: domusto_types_1.Domusto.PluginCategories.audio,
            version: '0.0.1',
            website: 'http://domusto.com'
        });
        this.domustoPlugin.pluginConfiguration = pluginConfiguration;
        console.log('pluginConfiguration', pluginConfiguration);
        let receiver = new AVReceiver(pluginConfiguration.settings.ip);
        this.domustoPlugin.hardwareInstance = receiver;
        receiver.getState().then(res => console.log(res), error => console.log(error));
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
}
exports.default = DomustoMarantz;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUF3QztBQUV4QyxpQ0FBaUM7QUFDakMscUNBQXFDO0FBRXJDLGFBQWE7QUFDYiwyREFBMkQ7QUFDM0QsNkRBQTZEO0FBRTdELGFBQWE7QUFDYixzREFBc0Q7QUFDdEQsMkNBQTJDO0FBRTNDLGtCQUFrQjtBQUNsQixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFeEMsd0VBQXdFO0FBQ3hFLHdFQUF3RTtBQUN4RSwyQ0FBMkM7QUFDM0Msb0RBQW9EO0FBQ3BELDRFQUE0RTtBQUU1RTs7Ozs7OztHQU9HO0FBQ0g7SUFLSTs7OztPQUlHO0lBQ0gsWUFBWSxtQkFBZ0QsRUFBRSxhQUFhO1FBRXZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGFBQWEsQ0FBQztZQUNuQyxNQUFNLEVBQUUsb0JBQW9CO1lBQzVCLE1BQU0sRUFBRSxjQUFjO1lBQ3RCLFFBQVEsRUFBRSx1QkFBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUs7WUFDeEMsT0FBTyxFQUFFLE9BQU87WUFDaEIsT0FBTyxFQUFFLG9CQUFvQjtTQUNoQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO1FBRTdELE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUV4RCxJQUFJLFFBQVEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7UUFFL0MsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FDcEIsR0FBRyxDQUFD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