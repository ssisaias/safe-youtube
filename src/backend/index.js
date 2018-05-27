console.log('background !')

/*
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({color: '#3aa757'}, function () {
    console.log('The color is green.')
  })
}) */

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.youtube.com', urlContains: '?v'}
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }])
  })
})
