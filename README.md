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

##### rules:
```javascript
 [
  Rule {
    premises: [ 'b', 'd', 'e' ],
    conclusion: 'f',
    disabled: false
  },
  Rule { premises: [ 'g', 'd' ], conclusion: 'a', disabled: false
 },
  Rule { premises: [ 'c', 'f' ], conclusion: 'a', disabled: false
 },
  Rule { premises: [ 'b' ], conclusion: 'x', disabled: false },
  Rule { premises: [ 'd' ], conclusion: 'e', disabled: false },
  Rule { premises: [ 'x', 'a' ], conclusion: 'h', disabled: false
 },
  Rule { premises: [ 'c' ], conclusion: 'd', disabled: false },
  Rule { premises: [ 'x', 'c' ], conclusion: 'a', disabled: false
 },
  Rule { premises: [ 'x', 'b' ], conclusion: 'd', disabled: false
 }
] 
```
##### forward chaining
```javascript
applying: R4: b=>x bf= {b,c,x}
applying: R7: c=>d bf= {b,c,x,d}
applying: R8: x,c=>a bf= {b,c,x,d,a}
applying: R9: x,b=>d bf= {b,c,x,d,a}
applying: R6: x,a=>h bf= {b,c,x,d,a,h}
applying: R5: d=>e bf= {b,c,x,d,a,h,e}
applying: R1: b,d,e=>f bf= {b,c,x,d,a,h,e,f}
applying: R3: c,f=>a bf= {b,c,x,d,a,h,e,f}
```
##### backward chaining
```javascript
default: 1
 stack.length = 1 (disabled rules: 0)
check : x result :  false
check : a result :  false
facts: {b,c}  stack= [h]
rule: x,a=>h stack: h,a remaining premisses: x,a
check : x result :  false
check : c result :  true
facts: {b,c}  stack= [h,a]
rule: x,c=>a stack: h,a,x remaining premisses: x
applied rules:
default: 2
 stack.length = 3 (disabled rules: 0)
check : b result :  true
facts: {b,c}  stack= [h,a,x]
* - applying: R4: b=>x bf= {b,c}  stack= [h,a,x]
check : x result :  true
check : c result :  true
facts: {b,c,x}  stack= [h,a]
* - applying: R8: x,c=>a bf= {b,c,x}  stack= [h,a]
applied rules: R4 (b=>x)->R8 (x,c=>a)
default: 3
 stack.length = 1 (disabled rules: 2)
check : x result :  true
check : a result :  true
facts: {b,c,x,a}  stack= [h]
* - applying: R6: x,a=>h bf= {b,c,x,a}  stack= [h]
applied rules: R4 (b=>x)->R8 (x,c=>a)->R6 (x,a=>h)

```


