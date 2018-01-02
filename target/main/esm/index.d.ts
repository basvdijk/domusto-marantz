/**
 * GPIO plugin for DOMUSTO
 * @author Bas van Dijk
 * @version 0.0.1
 *
 * @class DomustoMarantz
 * @extends {DomustoPlugin}
 */
declare class DomustoMarantz {
    domustoPlugin: any;
    /**
     * Creates an instance of DomustoMarantz.
     * @param {any} Plugin configuration as defined in the config.js file
     * @memberof DomustoMarantz
     */
    constructor(pluginConfiguration: any, domustoPlugin: any);
    outputCommand(device: any, command: any, onSucces: any): void;
}
export default DomustoMarantz;
