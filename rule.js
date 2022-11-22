class Rule{
    constructor(str){
        const arr = str.split("=>");
        if(arr.length !== 2) throw new Error("wrong rule format")
        const premises = arr[0].trim().split(',').map(el=>el.trim())
        const conclusion = arr[1].trim();
        this.premises = premises;
        this.conclusion = conclusion;
        this.disabled = false;
        
    }

    toString(){
        return this.premises.join(',') + "=>" + this.conclusion;
    }
    clone(){
        return new Rule(this.toString())
    }
}

module.exports =  Rule;
