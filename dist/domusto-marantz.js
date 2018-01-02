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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tdXN0by1tYXJhbnR6LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4vdHMvZG9tdXN0by1tYXJhbnR6LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQXdDO0FBRXhDLGlDQUFpQztBQUNqQyxxQ0FBcUM7QUFFckMsYUFBYTtBQUNiLDJEQUEyRDtBQUMzRCw2REFBNkQ7QUFFN0QsYUFBYTtBQUNiLHNEQUFzRDtBQUN0RCwyQ0FBMkM7QUFFM0Msa0JBQWtCO0FBQ2xCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV4Qyx3RUFBd0U7QUFDeEUsd0VBQXdFO0FBQ3hFLDJDQUEyQztBQUMzQyxvREFBb0Q7QUFDcEQsNEVBQTRFO0FBRTVFOzs7Ozs7O0dBT0c7QUFDSDtJQUtJOzs7O09BSUc7SUFDSCxZQUFZLG1CQUFnRCxFQUFFLGFBQWE7UUFFdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDO1lBQ25DLE1BQU0sRUFBRSxvQkFBb0I7WUFDNUIsTUFBTSxFQUFFLGNBQWM7WUFDdEIsUUFBUSxFQUFFLHVCQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSztZQUN4QyxPQUFPLEVBQUUsT0FBTztZQUNoQixPQUFPLEVBQUUsb0JBQW9CO1NBQ2hDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7UUFFN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBRXhELElBQUksUUFBUSxHQUFHLElBQUksVUFBVSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztRQUUvQyxRQUFRLENBQUMsUUFB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