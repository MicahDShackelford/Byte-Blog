let TabIndent = (id) => {
  let element = document.getElementById(id);
  element.onkeydown = function(e) {
    if(e.keyCode === 9) {
      let val = this.value,
          start = this.selectionStart,
          end = this.selectionEnd;
      this.value = val.substring(0, start) + '\t' + val.substring(end);
      this.selectionStart = this.selectionEnd = start + 1;
      return false;
    }
  }
}

export default TabIndent;