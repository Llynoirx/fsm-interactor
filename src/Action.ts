
import { EventType } from "./EventSpec.js";
import { Region } from "./Region.js";
import { Err } from "./Err.js";
import { Check } from "./Check.js"; 

//=================================================================== 
// Class for an object representing an action to be performed when a transition 
// in an FSM is taken. This consists of 3 parts:
//  * act   : The action to be performed
//  * region: The region to act on (can be undefined for actions not using a region)
//  * param : A string valued parameter for the action (can be undefined for actions not
//            usng a parameter).
//  Actions can  can be one of:
//   - set_image    set the image of the given region (or rather where it is to be 
//                  loaded from) based on the parameter value.  The parameter can be 
//                 "" for no image (which has the same effect as clear_image).
//   - clear_image set the image of the given region to empty/none. 
//   - none        do nothing (also used to patch up things loaded from bad json)
//   - print       print the parameter value
//   - print_event print the parameter value followed by a dump of the current event 
//===================================================================

// A type for the actions we support, along with correponding strings
export type ActionType = 'set_image' |  'clear_image' | 'none' | 'print' | 'print_event';
const actionTypeStrings = ['set_image',  'clear_image', 'none', 'print', 'print_event'];

// The type we are expecting to get back from decoding json for an Action
export type Action_json = {act: ActionType, region: string, param: string};

//. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

export class Action {

    public constructor ( actType : ActionType, regionName? : string, param? : string) 
    {
        this._actType = actType;
        this._onRegionName = regionName ?? "";
        this._param = param ?? "";
        this._onRegion = undefined;  // will be established once we have the whole FSM
    }

    // Construct an Action from an Action_json object.  We type check all the parts here
    // since data coming from json parsing lives in javascript land and may not actually 
    // be typed at runtime as we have declared it here.
    public static fromJson(jsonVal : Action_json) : Action {
        const actType : ActionType = Check.limitedString<ActionType>(
                    jsonVal.act, actionTypeStrings, "none", "Action.fromJson{act:}");

        const regionname = Check.stringVal(jsonVal.region??"", "Action.fromJsonl{region:}");
        const param = Check.stringVal(jsonVal.param??"", "Action.fromJson{param:}"); 
    
        return new Action(actType, regionname, param);
    }  

    //-------------------------------------------------------------------
    // Properties
    //-------------------------------------------------------------------

    // Type of action to be performed
    protected _actType : ActionType;
    public get actType() {return this._actType;}

    // The name of region our action is acting on
    protected _onRegionName : string;
    public get onRegionName() {return this._onRegionName;}

    // The actual region our action is acting on (this is established by bindRegion()
    // and could remain undefined if the region name doesn't match any actual region)
    protected _onRegion : Region | undefined;  
    public get onRegion() {return this._onRegion;}

    // The parameter string for the action (can be "")
    protected _param : string;
    public get param() {return this._param;}

    //-------------------------------------------------------------------
    // Methods
    //-------------------------------------------------------------------

    // Carry out the action represented by this object.  evtType and evtReg describe
    // the event which is causing the action (for use by print_event actions).
    public execute(evtType : EventType, evtReg? : Region) { 
        if (this._actType === 'none') return;
        
        // **** YOUR CODE HERE ****
    }

     //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
    
    // Attempt to find the name listed for this region in the given list of regions
    // (from the whole FSM), assiging the Region object to this._onRegion if found.
    public bindRegion(regionList : readonly Region[]) : void {
            
        // **** YOUR CODE HERE ****
        
        // ok to have no matching region for some actions
        if (this.actType === 'none' || this.actType === 'print' || 
                                       this.actType === 'print_event') {
            this._onRegion = undefined;
            return;
        }
        
        Err.emit(`Region '${this._onRegionName}' in action does not match any region.`);
    }
   
    //-------------------------------------------------------------------
    // Debugging Support
    //-------------------------------------------------------------------

    // Create a short human readable string representing this object for debugging
    public debugTag() : string {
        return `Action(${this.actType} ${this.onRegionName} "${this.param}")`;
    }

    //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

    // Create a human readable string displaying this object for debugging purposes
    public debugString(indent : number = 0) : string {
        let result = "";
        const indentStr = '  ';  // two spaces per indent level

        // produce the indent
        for (let i = 0; i < indent; i++) result += indentStr;

        // main display
        result += `${this.actType} ${this.onRegionName} "${this.param}"`;

        // possible warning about an unbound region
        if (!this.onRegion && this.actType !== 'none' && 
             this.actType !== 'print' && this.actType !== 'print_event') {
                result += " unbound";
        }
        
        return result;
    }
    //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .

    // Log a human readable string for this object to the console
    public dump() {
        console.log(this.debugString());
    }

    //. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   

} // end class Action

//===================================================================
