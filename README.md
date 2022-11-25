# basic-expert-system-engine
### Table of content
- [basic-expert-system-engine](#basic-expert-system-engine)
    - [Table of content](#table-of-content)
    - [Cloning the repository](#cloning-the-repository)
    - [Running the engine](#running-the-engine)
      - [Example1:](#example1)
        - [rules:](#rules)
        - [forward chaining results](#forward-chaining-results)
        - [backward chaining results:](#backward-chaining-results)
      - [Example2:](#example2)
        - [rules:](#rules-1)
        - [forward chaining](#forward-chaining)
        - [backward chaining](#backward-chaining)
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
 stack.length = 1 top element:  c null
facts: {e,f}  stack= [c]
             rule: e,b=>c stack: c,b remaining premisses: b next round :  b
default: 2
 stack.length = 2 top element:  b c
facts: {e,f}  stack= [c,b]
             rule: d,e=>b stack: c,b,d remaining premisses: d next round :  d
default: 3
 stack.length = 3 top element:  d b
facts: {e,f}  stack= [c,b,d]
* - applying: R5: e,f=>d bf= {e,f}  stack= [c,b,d]
default: 4
 stack.length = 2 top element:  b d
facts: {e,f,d}  stack= [c,b]
* - applying: R3: d,e=>b bf= {e,f,d}  stack= [c,b]
default: 5
 stack.length = 1 top element:  c b
facts: {e,f,d,b}  stack= [c]
* - applying: R1: e,b=>c bf= {e,f,d,b}  stack= [c]
applied rules: R5 (e,f=>d)->R3 (d,e=>b)->R1 (e,b=>c)
impossible rules:
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
 stack.length = 1 top element:  h null
facts: {b,c}  stack= [h]
             rule: x,a=>h stack: h,x remaining premisses: x,a next round :  x
default: 2
 stack.length = 2 top element:  x h
facts: {b,c}  stack= [h,x]
* - applying: R4: b=>x bf= {b,c}  stack= [h,x]
default: 3
 stack.length = 1 top element:  h x
facts: {b,c,x}  stack= [h]
             rule: x,a=>h stack: h,a remaining premisses: a next round :  a
default: 4
 stack.length = 2 top element:  a h
facts: {b,c,x}  stack= [h,a]
             rule: g,d=>a stack: h,a,g remaining premisses: g,d next round :  g
default: 5
 stack.length = 3 top element:  g a
default: 6
 stack.length = 3 top element:  g g
facts: {b,c,x}  stack= [h,a]
             rule: c,f=>a stack: h,a,f remaining premisses: f next round :  f
default: 7
 stack.length = 3 top element:  f a
facts: {b,c,x}  stack= [h,a,f]
             rule: b,d,e=>f stack: h,a,f,d remaining premisses: d,e next round :
  d
default: 8
 stack.length = 4 top element:  d f
facts: {b,c,x}  stack= [h,a,f,d]
* - applying: R7: c=>d bf= {b,c,x}  stack= [h,a,f,d]
default: 9
 stack.length = 3 top element:  f d
facts: {b,c,x,d}  stack= [h,a,f]
             rule: b,d,e=>f stack: h,a,f,e remaining premisses: e next round :
e
default: 10
 stack.length = 4 top element:  e f
facts: {b,c,x,d}  stack= [h,a,f,e]
* - applying: R5: d=>e bf= {b,c,x,d}  stack= [h,a,f,e]
default: 11
 stack.length = 3 top element:  f e
facts: {b,c,x,d,e}  stack= [h,a,f]
* - applying: R1: b,d,e=>f bf= {b,c,x,d,e}  stack= [h,a,f]
default: 12
 stack.length = 2 top element:  a f
facts: {b,c,x,d,e,f}  stack= [h,a]
* - applying: R3: c,f=>a bf= {b,c,x,d,e,f}  stack= [h,a]
default: 13
 stack.length = 1 top element:  h a
facts: {b,c,x,d,e,f,a}  stack= [h]
* - applying: R6: x,a=>h bf= {b,c,x,d,e,f,a}  stack= [h]
applied rules: R4 (b=>x)->R7 (c=>d)->R5 (d=>e)->R1 (b,d,e=>f)->R3 (c,f=>a)->R6 (
x,a=>h)
impossible rules: g,d=>a

```


