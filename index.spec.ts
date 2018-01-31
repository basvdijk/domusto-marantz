import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';

// DOMUSTO
import DomustoPlugin from '../../domusto/DomustoPlugin';
import { Domusto } from '../../domusto/DomustoTypes';

describe('Plugin DomustoMarantz', () => {

    let DomustoMarantzProxy;
    let DomustoPluginProxy;
    let broadcastSignalSpy;

    let marantzPluginInstance;

    before(() => {

        broadcastSignalSpy = sinon.spy(DomustoPlugin.prototype, 'broadcastSignal');

        let marantzAvrStub = sinon.stub().returns({
            getState() {
                return new Promise((resolve, reject) => {
                    resolve({
                        input: 'GAME',
                        power: true,
                        mute: false,
                        volume: '-30db',
                        surroundMode: 'MOVIE'
                    });
                });
            },
            setPowerState(state) {
                return new Promise((resolve, reject) => {
                    resolve(state);
                });
            }
        });

        DomustoMarantzProxy = proxyquire('./index', {
            'marantz-avr': marantzAvrStub,
        });

        marantzPluginInstance = new DomustoMarantzProxy.default({
            id: 'MARANTZ',
            enabled: true,
            dummyData: false,
            debug: true,
            settings: {
                ip: '192.168.178.2',
                pollInterval: 5 * 1000
            }
        });

    });

    after(() => {
        broadcastSignalSpy.restore();
    });

    it('should execute refreshRecieverStatus from contructor', () => {
        sinon.assert.called(broadcastSignalSpy);
    });

    it('should set the correct state when signal received', () => {

        let signal: Domusto.Signal = {
            pluginId: 'MARANTZ',
            sender: Domusto.SignalSender.client,
            deviceId: 'power',
            data: {
                state: 'on'
            }
        };

        marantzPluginInstance.onSignalReceivedForPlugin(signal);
        sinon.assert.calledWith(broadcastSignalSpy, 'power', { state: 'on' });
    });

    it('should broadcast update on refreshRecieverStatus', () => {

        marantzPluginInstance.refreshReceiverStatus();

        setTimeout(() => {

            // console.log(broadcastSignalSpy.getCalls()[0].args);

            sinon.assert.calledWith(broadcastSignalSpy, 'power', { state: 'on' });
            sinon.assert.calledWith(broadcastSignalSpy, 'mute', { state: 'off' });
            sinon.assert.calledWith(broadcastSignalSpy, 'surroundMode', { state: 'MOVIE' });
            sinon.assert.calledWith(broadcastSignalSpy, 'input', { state: 'GAME' });

            process.exit();

        }, 100);

    });

});