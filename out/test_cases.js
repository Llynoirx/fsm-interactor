import { Root } from "./Root.js";
import { FSMInteractor } from "./FSMInteractor.js";
import { Region } from "./Region.js";
import { State } from "./State.js";
import { EventSpec } from "./EventSpec.js";
import { Action } from "./Action.js";
import { FSM } from "./FSM.js";
import { Transition } from "./Transition.js";
//. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
// The root object which will be linked to our canvas (which must have 
// an ID of "FSM-main-canvae"), and which we will build our test objects under.
let root;
//-------------------------------------------------------------------
// Main testing routine -- invoked from index.html 
//-------------------------------------------------------------------
export function runTests() {
    console.log("Running...");
    root = new Root("FSM-main-canvas");
    root.doDebugOutput = true;
    test1();
    test2();
    test3();
    console.log("Test is set up...");
}
//-------------------------------------------------------------------
// Test of building an FSM interactor by initialization in code.  The FSM here
// has one state with one transition that loops all event back to itself with 
// a print_event action to display what events are delivered.  Images in this 
// test do not change.
function test1() {
    let r1 = new Region("r1", "./images/one.png", 0, 0, 50, 77);
    let r2 = new Region("r2", "./images/two.png", 20, 50, -1, 50);
    let r3 = new Region("r3", "./images/three.png", 40, 100, 77, 30);
    let r4 = new Region("r4", "./images/four.png", 60, 150);
    let r5 = new Region("r5", "", 80, 200, 77, 77);
    let ev1 = new EventSpec('any', '*');
    let acts = [];
    acts[0] = new Action('print_event', "", "evt--->");
    let tr1 = new Transition('only_state', ev1, acts);
    let st1 = new State('only_state', [tr1]);
    const fsm = new FSM([r1, r2, r3, r4, r5], [st1]);
    let fsmInt = new FSMInteractor(fsm);
    root.addChild(fsmInt);
}
//. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
// Test of an object loaded from a .json file.  This test produces an FSM similar
// to test1() (e.g., with fixed images and one "loopback/debug" state)
function test2() {
    let fsmInt = new FSMInteractor(undefined, 170, 0);
    root.addChild(fsmInt);
    fsmInt.startLoadFromJson("./fsm_json/test2.json");
}
//. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
// Create a more comprehensive and functional object from a .json file.
function test3() {
    let fsmInt = new FSMInteractor(undefined, 400, 0);
    root.addChild(fsmInt);
    fsmInt.startLoadFromJson("./fsm_json/stick.json");
}
//-------------------------------------------------------------------
//# sourceMappingURL=test_cases.js.map