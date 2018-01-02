"use strict";
// import { Domusto } from "domusto-types";
Object.defineProperty(exports, "__esModule", { value: true });
// import util from '../../util';
// import config from '../../config';
// // DOMUSTO
// import DomustoPlugin from '../../domusto/DomustoPlugin';
// import DomustoEmitter from '../../domusto/DomustoEmitter';
// INTERFACES
// import { PluginCategories } from 'domusto-typings';
// import { Domusto } from 'domusto-types';
// PLUGIN SPECIFIC
var AVReceiver = require('marantz-avr');
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
var DomustoMarantz = /** @class */ (function () {
    /**
     * Creates an instance of DomustoMarantz.
     * @param {any} Plugin configuration as defined in the config.js file
     * @memberof DomustoMarantz
     */
    function DomustoMarantz(pluginConfiguration, domustoPlugin) {
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
        var receiver = new AVReceiver(pluginConfiguration.settings.ip);
        this.domustoPlugin.hardwareInstance = receiver;
        receiver.getState().then(function (res) { return console.log(res); }, function (error) { return console.log(error); });
        // this.refreshReceiverStatus();
    }
    // refreshReceiverStatus() {
    //     this.onNewInputData({
    //         pluginId: this._pluginConfiguration.type,
    //         deviceId: 'mute',
    //         command: 'on'
    //     });
    // }
    DomustoMarantz.prototype.outputCommand = function (device, command, onSucces) {
        console.log('Marantz output', command);
        switch (device.protocol.outputId) {
            case 'power':
                this.domustoPlugin.hardwareInstance.setPowerState(command === 'on').then(function (res) {
                    onSucces({ state: command === 'on' ? 'on' : 'off' });
                }, function (error) { return console.log(error); });
                break;
            case 'source':
                this.domustoPlugin.hardwareInstance.setInputSource(device.protocol.subType).then(function (res) {
                    // onSucces();
                }, function (error) { return console.log(error); });
                break;
            case 'mute':
                this.domustoPlugin.hardwareInstance.setMuteState(command === 'on').then(function (res) {
                    onSucces({ state: command === 'on' ? 'on' : 'off' });
                }, function (error) { return console.log(error); });
                break;
            case 'volume':
                switch (command) {
                    case 'off':
                        this.domustoPlugin.hardwareInstance.volumeUp().then(function (res) {
                            onSucces({ state: command === 'on' ? 'on' : 'off' });
                        }, function (error) { return console.log(error); });
                        break;
                    case 'on':
                        this.domustoPlugin.hardwareInstance.volumeDown().then(function (res) {
                            onSucces({ state: command === 'on' ? 'on' : 'off' });
                        }, function (error) { return console.log(error); });
                        break;
                }
                break;
        }
    };
    return DomustoMarantz;
}());
exports.default = DomustoMarantz;
