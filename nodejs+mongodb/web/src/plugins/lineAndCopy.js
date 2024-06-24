import $ from 'jquery'
import Vue from 'vue'
export const addLineAndCopy = () => {
  $('pre code').each(function () {
    let lines = $(this).text().split('\n').length - 1
  
    let $numbering = $('<ol/>').addClass('pre-numbering')
    let $copy = $('<i title="copy"/>').addClass('el-icon-document-copy code-copy')
    $(this)
      .parent()
      .addClass('code')
      .append($numbering)
      .append($copy)
    for (let i = 0; i <= lines; i++) {
      $numbering.append($('<li/>'))
    }
  })
  $('pre.code i.code-copy').click(e => {
    let text = $(e.target).siblings('code').text()
    let element = $('<textarea>' + text + '</textarea>')
    $('body').append(element)
    element[0].select()
    document.execCommand('Copy')
    element.remove()
    Vue.prototype.$message.success({
      message: 'copied'
    })
  })
}