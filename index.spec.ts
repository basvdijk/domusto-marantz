import DomustoPlugin from '../../domusto/DomustoPlugin';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';
import { Domusto } from '../../domusto/DomustoInterfaces';

describe('Plugin DomustoMarantz', () => {

    let DomustoMarantzProxy;
    let DomustoPluginProxy;
    let broadcastSignalSpy;

    let marantzPluginInstance;

    beforeEach(function () {

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


    // beforeEach(function () {
    //     existsSyncStub = sinon.stub(); // create a stub for every test

    //     // import the module to test, using a fake dependency
    //     doesFileExist = proxyquire('./index', {
    //         'marantz-avr': {
    //             existsSync: existsSyncStub
    //         }
    //     });

    // });

    // describe('when a path exists', function () {
    //     beforeEach(function() {
    //         existsSyncStub.returns(true); // set the return value that we want
    //     });

    //     it('should return `true`', function () {
    //         let actual = doesFileExist('9d7af804-4719-4578-ba1d-5dd8a4dae89f');

    //         assert.equal(actual, true);
    //     });
    // });
// });

// let AVReceiver = require('marantz-avr');
// // sinon.stub(AVReceiver.prototype, 'AVReceiver').callsFake(() => {
// //     return {
// //         setPowerState: () => {
// //             return true;
// //         }
// //     };
// // });
// // sinon.stub(AVReceiver.prototype, 'AVReceiver')
// // .yields({
// //         setPowerState: () => {
// //             return true;
// //         }
// //     });

// let AVReceiverStub = sinon.createStubInstance(AVReceiver);


// import DomustoMarantz from './';

// @suite
// class DomustoMarantzTest {

//     // public static before() {
//     //     // require chai and use should() assertions
//     //     let chai = require('chai');
//     //     chai.should();
//     // }

//     @test('should create a new User')

//     public create() {

//         // before(() => {

//         // });

//         // before(() => {

//         // let spy = sinon.spy(console, 'log');
//         // sinon.stub(AVReceiver.prototype, 'AVReceiver').callsFake(() => {

//         //     return 123;

//         // });

//         // }
//         // .yield({ test: 123 });


//         let marantz = new DomustoMarantz({
//             id: 'MARANTZ',
//             enabled: true,
//             dummyData: false,
//             debug: true,
//             settings: {
//                 ip: '192.168.178.2',
//                 pollInterval: 5 * 1000
//             }
//         });

//         console.log(marantz);

//         // this.hardwareInstance.setPowerState

//         // spy.called.should.equal({ test: 123 });

//     }

// }



// // @suite class DomustoMarantzTest {

// //     marantz;

// //     before() {

// //         this.marantz = new DomustoMarantz({
// //             id: 'MARANTZ',
// //             enabled: true,
// //             dummyData: false,
// //             debug: true,
// //             settings: {
// //                 ip: '192.168.178.2a',
// //                 pollInterval: 5 * 1000
// //             }
// //         });
// //     }

// //     @test world() {


// //         console.log(this.marantz);

// //         // assert.equal(this.marantz.pluginConfiguration.id, 'MARANTZ', 'Expected id to eaqal MARANTZ');

// //         assert.notEqual(1, 2, 'Expected one to equal two.');
// //         assert.equal(1, 1, 'Expected one to equal one.');
// //     }

// // }
