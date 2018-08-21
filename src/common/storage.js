let storage = new Map();
export default storage;
let common = {
    expando: 1,
    bgImg: null,
    title: "专题",
    mainWidth: 1000,
    canvasHeight: 1000,
    cache:[],
    lzcache:{key:"lz",value:{}}
};
let destroyList = new Map();
export {
    common,
    destroyList,
    storage
}