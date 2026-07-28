type Tree<T> =
  | { kind: 'empty' }
  | { kind: 'node', value: T, left: Tree<T>, right: Tree<T> }
type EmptyTree = <T>() => Tree<T>;
type Compare<T> = (a: T, b: T) => number

const empty: EmptyTree = () => ({ kind: 'empty' })
const leaf = <T>(value: T): Tree<T> => ({ kind: 'node', value, left: { kind: 'empty' }, right: { kind: 'empty' } })
const insert = <T>(cmp: Compare<T>) => (t: Tree<T>, value: T): Tree<T> => {
  if (t.kind === 'empty') {
    return leaf(value)
  }
  const c = cmp(value, t.value)
  if (c < 0) return { ...t, left: insert(cmp)(t.left, value) }
  if (c > 0) return { ...t, right: insert(cmp)(t.right, value) }
  return t
}

// step 4: the one recursive function. catamorphism.
const fold = <T, R>(
  onEmpty: () => R,
  onNode: (value: T, left: R, right: R) => R
) => (t: Tree<T>): R =>
    t.kind === 'empty'
      ? onEmpty()
      : onNode(t.value, fold(onEmpty, onNode)(t.left), fold(onEmpty, onNode)(t.right))


const size = <T>(t: Tree<T>) => fold<T, number>(() => 0, (_, l, r) => 1 + l + r)(t)
const height = <T>(t: Tree<T>) => fold<T, number>(() => -1, (_, l, r) => 1 + Math.max(l, r))(t)
const inorder = <T>(t: Tree<T>) => fold<T, T[]>(() => [], (v, l, r) => [...l, v, ...r])(t)

const numeric: Compare<number> = (a, b) => a - b

const main = () => {
  const tree: Tree<number> = { kind: 'empty' }
  console.log(inorder(tree), size(tree), height(tree))

  const t = [5, 3, 7, 1].reduce(insert(numeric), { kind: 'empty' } as Tree<number>)
  console.log(inorder(t), size(t), height(t))
}

main();

