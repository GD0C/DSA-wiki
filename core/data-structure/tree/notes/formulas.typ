#let choose = $T(n)=((2 * n)_c n)/(n + 1)$



#let emphBold(text) = {
  [*#emph(text)*] 
}



#box(width: 100%, height: 100%, stroke: 1pt, inset: 24pt)[

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

    10) *Height* - 

    11) *Forest* - 

  ]


  #align(center)[
    #choose
  ]

]
