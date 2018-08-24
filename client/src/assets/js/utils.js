function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function reloadFT(){
    var tree = $("#tree").fancytree("getTree");
    var node = tree.getActiveNode();
    var keyNode = node.key.toString();
    tree.reload();
    await sleep(500);
    var newTree = $("#tree").fancytree("getTree");
    var activeNode = newTree.getNodeByKey(keyNode);
    if (activeNode){
        activeNode.setActive();
    }
}