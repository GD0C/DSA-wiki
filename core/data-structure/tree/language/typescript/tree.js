var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var empty = function () { return ({ kind: 'empty' }); };
var leaf = function (value) { return ({ kind: 'node', value: value, left: { kind: 'empty' }, right: { kind: 'empty' } }); };
var insert = function (cmp) { return function (t, value) {
    if (t.kind === 'empty') {
        return leaf(value);
    }
    var c = cmp(value, t.value);
    if (c < 0)
        return __assign(__assign({}, t), { left: insert(cmp)(t.left, value) });
    if (c > 0)
        return __assign(__assign({}, t), { right: insert(cmp)(t.right, value) });
    return t;
}; };
// step 4: the one recursive function. catamorphism.
var fold = function (onEmpty, onNode) { return function (t) {
    return t.kind === 'empty'
        ? onEmpty()
        : onNode(t.value, fold(onEmpty, onNode)(t.left), fold(onEmpty, onNode)(t.right));
}; };
var size = function (t) { return fold(function () { return 0; }, function (_, l, r) { return 1 + l + r; })(t); };
var height = function (t) { return fold(function () { return -1; }, function (_, l, r) { return 1 + Math.max(l, r); })(t); };
var inorder = function (t) { return fold(function () { return []; }, function (v, l, r) { return __spreadArray(__spreadArray(__spreadArray([], l, true), [v], false), r, true); })(t); };
var numeric = function (a, b) { return a - b; };
var main = function () {
    var tree = { kind: 'empty' };
    console.log(inorder(tree), size(tree), height(tree));
    var t = [5, 3, 7, 1].reduce(insert(numeric), { kind: 'empty' });
    console.log(inorder(t), size(t), height(t));
};
main();
