const Rule = require("./rule");
const fs = require("fs/promises");

const exo = getExoNumberArg();
const faits = exo === 1 ?["e","f"]: ["b","c"];
const but = exo === 1 ? 'c':'h';

(async function  (){
    const data = await fs.readFile(exo === 1 ?"exo1.txt":"exo2.txt",{encoding:"utf8"})
    const rules = data.split('\r\n').map(r=>new Rule(r));
    console.log("exercice number : "+exo)
    console.log("forward chaning ----------------------------------------------------------------------------------")
    /forwardChaining(faits,rules);
    console.log("backward chaining ----------------------------------------------------------------------------------")
    console.log(faits,but)
    backwardChaining(faits,rules,but)
    
    
})()





function forwardChaining(facts,inputRules){
    const rules = inputRules.map(rule=>rule.clone());
    const factsSet = new Set([...facts]);
    let dRules = 0;
    let prevDrules = Infinity;
    let sense = 'down'
    
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
    const appliedRules = []
    let savedRule = null;
    let lastGoal = null;
    const imposibleRules = [];
    console.log("backward chaining: ",facts,rules,"goal: "+fact)
    while(stack.length !== 0  ){
        console.count()
        console.log(" stack.length = "+stack.length,"top element: ",stack[stack.length -1],lastGoal)
        if(stack[stack.length -1] === lastGoal){ 
            stack.pop();
            savedRule.disabled = true;
            imposibleRules.push(savedRule)
        }
        lastGoal = stack[stack.length -1 ];
        for(let i=0 ;i<rules.length;i++){
            const rule = rules[i];
            if(rule.disabled || rule.conclusion != stack[stack.length-1]) continue;
            const reminingPremisses = [];
            let allPrimissesExist = true;
            rule.premises.forEach(p=>{ 
                const h = factsSet.has(p)
                if(!h){ 
                    reminingPremisses.push(p)
                    allPrimissesExist = false;
                }
            

            })
            console.log("facts: "+ "{"+[...factsSet].join(',') + "}" +"  stack= ["+[...stack].join(',')+"]")
            if(allPrimissesExist){
                console.log('* - applying: R'+(i+1)+': '+rule.toString(),"bf= {" +[...factsSet].join(',') + "}" +"  stack= ["+[...stack].join(',')+"]")
                appliedRules.push(`R${i+1} (${rule.toString()})`)
                rule.disabled = true;
                factsSet.add(rule.conclusion); 
                stack.pop();
                break;
            }else{
                
                stack.push(reminingPremisses[0])
                console.log('             rule: '+rule+` stack: `+stack ,'remaining premisses: '+reminingPremisses,"next round : ",reminingPremisses[0])
                savedRule = rule;
                break;
                
            }
         }
        
        }
        
        
        console.log("applied rules: "+appliedRules.join('->'))
        console.log("impossible rules: "+imposibleRules.join('->'))
}



function getExoNumberArg(){
    if(process.argv.length !== 3 ) throw new Error("argument count should be 1")
    const argv2Int = parseInt(process.argv[2]);
    if( argv2Int == NaN ) throw new Error("argument should be a number")
    if(![1,2].includes(argv2Int) ) throw new Error("argument should be either 1 or 2");

    return argv2Int
}