'use strict';

var args = process.argv.slice(2);
var targetPath = args[0];
var nodeModulesPath = args[1];
if (nodeModulesPath) {
  module.paths.push(nodeModulesPath);
}

var MAX_WARNINGS = 7;

var CLIEngine = require('eslint').CLIEngine;
var cli = new CLIEngine();

var report = cli.executeOnFiles([targetPath]);
// eslint-disable-next-line no-console
console.log(format(report.results));


function format(results) {
  var lines = [];
  var title = 'error';

  function numberWang(wangaNumb) {
    var thatsNumberWang = 7 - wangaNumb;
    var stayNumberWang = '';
    var i;

    for (i = 0; i < thatsNumberWang; i++) {
      stayNumberWang += ' ';
    }

    return stayNumberWang;
  }

  lines.push('[ESLint: ' + results[0].filePath + ']');
  lines.push('');

  var messages = results[0].messages;
  var errorCount = results[0].errorCount || 0;
  var warningCount = results[0].warningCount || 0;
  var count = 0;

  errorCount += warningCount;

  if (errorCount) {
    if (errorCount > 1) {
      title += 's';
    }

    messages.forEach(function(error) {
      if (count >= MAX_WARNINGS) {
        return;
      }
      var ruleId = error.ruleId ? ' (' + error.ruleId + ')' : '';

      lines.push([
        numberWang((error.line + error.column.toString()).length),
        error.line + ',' + error.column + ':',
        error.message + ruleId
      ].join(' '));

      count++;
    });

    lines.push('');
    lines.push(
      '✗ ' + count + ' ' + title +
      ', double-click above, [F4] for next, [shift-F4] for previous.'
    );
  } else {
    lines.push('✓ 0 errors, [esc] to hide.');
  }

  lines.push('');
  return lines.join('\n');
}
