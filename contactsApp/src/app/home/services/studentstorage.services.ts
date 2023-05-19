import { Injectable } from "@angular/core";
import { Storage } from "@capacitor/storage";

@Injectable({
    providedIn: 'root'
})

export class StudentStorage {
    constructor(){}

    // to save any object in this case student
    async setObject(key:string, value:any){               
        await Storage.set({key, value: JSON.stringify(value)});      
    }

    // to get any object in this case student
    async getObject(key: string): Promise<{value: any}> {
        const ret = await Storage.get({key});
        
        return ret.value? JSON.parse(ret.value):null;
    }

    // to save the dictionary with the key name 
    async setString(key:string, value:string)
    {
        await Storage.set({key,value});
    }

    // to get the saved information from storage like a dictionary 
    async getString(key:string): Promise<{value: any}>{
        return (await Storage.get({key}));
    }

    // to clear all information in the storage
    async clearStorage()
    {
        await Storage.clear();
    }
}