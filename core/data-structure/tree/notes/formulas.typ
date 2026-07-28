#import "@preview/typed-dsa:0.1.0": *


#let choose = $T(n)=((2 * n)_c n)/(n + 1)$


#let implies = $arrow.long$

#let emphBold(text) = {
  [*#emph(text)*] 
}


#let exampleGraph(text, values) = {
  values.join()

  box(width: 100%, height: 100%, stroke: 1pt, inset: 24pt, outset: 24pt, radius: 8pt)[
    #text
    #line(length: 100%)
    #bst(values).diagram
  ]
}


#box(width: 100%, height: 100%, stroke: 1pt, inset: 24pt, outset: 24pt, radius: 8pt)[

  = Terms:

  #line(length: 100%)

#align(center)[
    #image("../images/Treedatastructure.png", height: 20%)
  ]
  #box(inset: 12pt, fill: rgb("#f0f0f0"), radius: 8pt)[

    1) *Root* - The root, is the #emphBold("starting") position where the first node sits. 

    The root in the image about is {#emphBold("A")}.
    #line(length: 100%)

    2) *Parent* - To easily explain this, #emphBold("Root") = starting $--> forall n, n = "node"$ that come from the root, are know as *#emph("children")* and root would be the #emphBold("Parent"). 

    #emphBold("B") = { #emphBold("D, E") } where D, E are children and B is the Parent $and$ #emphBold("A") = { #emphBold("B, C") } is the Parent.

    3) *Child* - Again, let's make it easy - above I basically explained it... but if you don't understand... the #emphBold("child") in the case about would be the nodes descending from the #emphBold("root"). (see above case) 

    4) *Sibling* - Those who are #emphBold("children") to the same #emphBold("Parent") are #emphBold("Siblings"). 
  
    with the #emphBold("B") = { #emphBold("D, E") } case - D, E are siblings! They both have B as a Parent.
    #line(length: 100%)
    5) *Descendents* - This is hard to explain without a visual but essentially if you pick a node within a tree - it's desencdants are the nodes that are #emphBold("Below") it.   

    #emphBold("B") = { #emphBold("D, E, H, I, K, L, M, N") } are all descendents of B. 
    #line(length: 100%)

    6) *Ancestor* - Ancestors are the nodes that are #emphBold("'above'") the current node being looked at (which I will elaborate more on)

    #emphBold("L") = { #emphBold("H, D, B, A") } are all nodes that are Ancestors of L.
    #line(length: 100%)

    7) *Degree of node* - The degree is hard to explain without a visual - but the #emphBold("Degree") is essentially the amount of 

    8) *Internal/External (Terminal/Non-Terminal)* - Nodes that leafs are #emphBold("Non-Terminals") $forall$ other nodes they are said to be #emphBold("Terminals").  

    9) *Levels* -  Levels are the #emphBold("depth") of a tree, starting at 1 index. (Height starts at 0)

    10) *Height* - The height of the tree starting from 0 index, essentially when you draw it out you will assume the #emphBold("root") to be the [0] index.

    11) *Forest* -  essentially a forrest is when you have a collection of trees.

  ]
]


#box(width: 100%, height: 50%, stroke: 1pt, inset: 24pt, outset: 24pt, radius: 8pt)[
  #figure(image("../images/tree-structures.png"), caption: "Tree Structures")

  #line(length: 100%)

  #box(inset: 12pt, fill: rgb("#f0f0f0"), radius: 8pt)[
      1) #emphBold("Full") - A full binary tree is also a #emphBold("Strict Binary Tree")!  

      2) #emphBold("Complete") - A tree that is filled with nodes from #emphBold("Left to right") - or fills by lvl.

      3) #emphBold("Degenerate") - A tree that is Degenerate is a tree that 

      4) #emphBold("Perfect") - A tree that is Perfect #implies the tree will have the #emphBold("Maximum amount of nodes possible") #implies $n=2^(h+1)-1$ 

      This one is Also a #emphBold("Strict Binary Tree") but also a #emphBold("Complete Binary Tree").

      5) #emphBold("Balanced") - A tree that is said to be #emphBold("Balanced") 
      ]
]


#v(2em)


#let questions = [
#align(center)[
    Is this Complete? 

    Is this Full?

    Is this Perfect? 

    Is this Balanced?

    Is this Degenerate?
  ]
]


= Examples
#v(1em)




// create functoion for this
#let exampleValues = (
  (1, 2, 4, 6, 55, 68),
  (85, 69, 22, 105, 120, 103, 80),
  (55, 21, 17, 19, 37, 69)
)
#let firstValues = exampleValues.at(0)
#let secondValues = exampleValues.at(1)
#let thirdValues = exampleValues.at(2)

#grid(columns: 3,
rect[
  #box(inset: 12pt, fill: rgb("#f0f0f0"), radius: 8pt, stroke: black)[
        #text("Example 1: ")
        #bst(..firstValues).diagram
  ]

  #questions
  
], 
rect[
  #box(inset: 12pt, fill: rgb("#f0f0f0"), radius: 8pt, stroke: black)[
        #text("Example 2: ")
        #bst(..secondValues).diagram
  ]

  #questions
],
rect[
  #box(inset: 12pt, fill: rgb("#f0f0f0"), radius: 8pt, stroke: black)[
        #text("Example 3: ")
        #bst(..thirdValues).diagram
  ]

  #questions
],
)

