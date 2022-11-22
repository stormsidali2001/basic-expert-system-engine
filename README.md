# basic-expert-system-engine
### Description
### Cloning the repository
```
git clone https://github.com/stormsidali2001/basic-expert-system-engine 
cd basic-expert-system-engine
```

### Running the engine
#### Example1:
```
node app.js 1
```
> this will run the engine with the inputs : rule in database exo1.txt with initial facts ['e','f'] and a goal of 'c' for backward chaining
##### rules:
```javascript
 [
  Rule { premises: [ 'e', 'b' ], conclusion: 'c', disabled: false
 },
  Rule { premises: [ 'f', 'd' ], conclusion: 'a', disabled: false
 },
  Rule { premises: [ 'd', 'e' ], conclusion: 'b', disabled: false
 },
  Rule { premises: [ 'b', 'd' ], conclusion: 'f', disabled: false
 },
  Rule { premises: [ 'e', 'f' ], conclusion: 'd', disabled: false
 }
] 
```
##### forward chaining results
```javascript
applying: R5: e,f=>d bf= {e,f,d}
applying: R3: d,e=>b bf= {e,f,d,b}
applying: R2: f,d=>a bf= {e,f,d,b,a}
applying: R1: e,b=>c bf= {e,f,d,b,a,c}
applying: R4: b,d=>f bf= {e,f,d,b,a,c}
[ 'e', 'f', 'd', 'b', 'a', 'c' ]
```
##### backward chaining results:
```javascript
default: 1
 stack.length = 1 (disabled rules: 0)
check : e result :  true
check : b result :  false
facts: {e,f}  stack= [c]
rule: e,b=>c stack: c,b remaining premisses: b
check : d result :  false
check : e result :  true
facts: {e,f}  stack= [c,b]
rule: d,e=>b stack: c,b,d remaining premisses: d
check : e result :  true
check : f result :  true
facts: {e,f}  stack= [c,b,d]
* - applying: R5: e,f=>d bf= {e,f}  stack= [c,b,d]
applied rules: R5 (e,f=>d)
default: 2
 stack.length = 2 (disabled rules: 1)
check : d result :  true
check : e result :  true
facts: {e,f,d}  stack= [c,b]
* - applying: R3: d,e=>b bf= {e,f,d}  stack= [c,b]
applied rules: R5 (e,f=>d)->R3 (d,e=>b)
default: 3
 stack.length = 1 (disabled rules: 2)
check : e result :  true
check : b result :  true
facts: {e,f,d,b}  stack= [c]
* - applying: R1: e,b=>c bf= {e,f,d,b}  stack= [c]
applied rules: R5 (e,f=>d)->R3 (d,e=>b)->R1 (e,b=>c)
```

#### Example2:
```
node app.js 2
```
> this will run the engine with the inputs : rule in database exo2.txt with initial facts ['b','c'] and a goal of 'h' for backward chaining

