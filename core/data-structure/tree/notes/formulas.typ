#let choose = $T(n)=((2 * n)_c n)/(n + 1)$


#let implies = $arrow.long$

#let emphBold(text) = {
  [*#emph(text)*] 
}


= Binary Trees:

#box(width: 100%, height: 62%, stroke: 1pt, inset: 24pt)[

  = Terms:

  #line(length: 100%)

  #box(inset: 12pt, fill: rgb("#f0f0f0"), radius: 8pt)[

    1) *Root* - The root, is the #emphBold("starting") position where the first node sits.

    2) *Parent* - To easily explain this, #emphBold("Root") = starting $--> forall n, n = "node"$ that come from the root, are know as *#emph("children")* and root would be the #emphBold("Parent"). 

    3) *Child* - Again, let's make it easy - above I basically explained it... but if you don't understand... the #emphBold("child") in the case about would be the nodes descending from the #emphBold("root"). 

    4) *Sibling* - Those who are #emphBold("children") to the same #emphBold("Parent") are #emphBold("Siblings"). 

    5) *Descendents* - This is hard to explain without a visual but essentially if you pick a node within a tree - it's desencdants are the nodes that are #emphBold("Below") it.   

    6) *Ancestor* - Ancestors are the nodes that are #emphBold("'above'") the current node being looked at (which I will elaborate more on)

    7) *Degree of node* - The degree is hard to explain without a visual - but the #emphBold("Degree") is essentially the amount of 

    8) *Internal/External (Terminal/Non-Terminal)* - Nodes that leafs are #emphBold("Non-Terminals") $forall$ other nodes they are said to be #emphBold("Terminals").  

    9) *Levels* - 

    10) *Height* - The height of the tree starting from 0 index, essentially when you draw it out you will assume the #emphBold("root") to be the [0] index.

    11) *Forest* -  essentially a forrest is when you have a collection of trees.

  ]
]
#box(width: 100%, height: 60%, stroke: 1pt, inset: 24pt)[
  #figure(image("../images/tree-structures.png"), caption: "Tree Structures")

  #line(length: 100%)

  #box(inset: 12pt, fill: rgb("#f0f0f0"), radius: 8pt)[
      1) #emphBold("Full") - A full binary tree is also a #emphBold("Strict Binary Tree")!  

      2) #emphBold("Complete") - A tree that is filled with nodes from #emphBold("Left to right") - or fills by lvl.

      3) #emphBold("Degenerate") - 

      4) #emphBold("Perfect") - A tree that is Perfect #implies the tree will have the #emphBold("Maximum amount of nodes possible") #implies $n=2^(h+1)-1$  

      5) #emphBold("Balanced") - 
      ]

  #align(center)[
    #choose
  ]
]
