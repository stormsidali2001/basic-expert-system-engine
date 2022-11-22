const Rule = require("./rule");
const fs = require("fs/promises");

const exo =2;
const faits = exo === 1 ?["e","f"]: ["b","c"];
const but = exo === 1 ? 'c':'h';

(async function  (){
    const data = await fs.readFile("./exo2.txt",{encoding:"utf8"})
    const rules = data.split('\r\n').map(r=>new Rule(r));
    console.log("exo num : "+exo)
     console.log("forward chaning -------------------")
     // forwardChaining(faits,rules);
    console.log("backward chaining -------------------")
    console.log(faits,but)
    backwardChaining(faits,rules,but)
    
    
})()





function forwardChaining(facts,inputRules){
    const rules = inputRules.map(rule=>rule.clone());
    const factsSet = new Set([...facts]);
    let dRules = 0;
    let prevDrules = Infinity;
    let sense = 'down'
    
    console.log(`starting forward chaining: `,'facts',facts,'rules',rules)
    while(dRules !== rules.length && prevDrules !== dRules){
        prevDrules = dRules;
        for(let i= (sense === 'down'?0:rules.length-1) ; sense === 'down'? i <rules.length : i>0;sense === 'down'?i++:i--){
            const rule = rules[i];
            if(rule.disabled) continue;
            const allPrimissesExist = rule.premises.every(p=> factsSet.has(p))
            if(allPrimissesExist){
                rule.disabled = true;
                dRules++;
                factsSet.add(rule.conclusion); 
                console.log('applying: R'+(i+1)+': '+rule.toString()+" bf= {" +[...factsSet].join(',') + "}" )
            }
         }
         if(sense === 'down') {
            sense = 'up'
        }
         else sense = 'down'
       
    }
    console.log([...factsSet])
}

function backwardChaining(facts,inputRules,fact){
    const rules = inputRules.map(rule=>rule.clone());
    const factsSet = new Set([...facts]);
    const stack = [fact];
    let dRules = 0;
    let prevDrules = Infinity;
    console.log("backward chaining: ",facts,rules,"goal: "+fact)
    while(stack.length !== 0 ){
        // console.count("iterations: stack.length = "+stack.length+" (disabled rules: "+dRules+")")
        prevDrules = dRules;
        for(let i=0 ;i<rules.length;i++){
            const rule = rules[i];
            if(rule.disabled || rule.conclusion != stack[stack.length-1]) continue;
            const reminingPremisses = [];
            const allPrimissesExist = rule.premises.every(p=>{ 
                const h = factsSet.has(p)
                if(!h) reminingPremisses.push(p);
                return h;

            })
            if(allPrimissesExist){
                rule.disabled = true;
                console.log('applying: R'+(i+1)+': '+rule.toString(),"bf= {" +[...factsSet].join(',') + "}" +"  stack= ["+[...stack].join(',')+"]")
                factsSet.add(rule.conclusion); 
                dRules++;
                stack.pop()
            }else{
                reminingPremisses.forEach(rp=>stack.push(rp))
                console.log(`stack: `+stack)
                
            }
         }
    }
   

}

