'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true); //rerun initialize to set up click handlers again
}

function teardownTest(){
}

test('Calculate 2 numbers', function(){
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  deepEqual($('#op1').val(), '', 'op1 should be blank');
  deepEqual($('#op2').val(), '', 'op2 should be blank');
  deepEqual($('#operator').val(), '', 'operator should be blank');
  deepEqual($('#result').text(), '6', 'result should be 6');
  });

  test('Paper Trail', function(){
    expect(13);

    $('#op1').val('3');
    $('#op2').val('2');
    $('#operator').val('+');
    $('#calculate').trigger('click');

    deepEqual($('#history > li').length, 1, 'should be 1 LIs');
    $('#op1').val('7');
    $('#op2').val('8');
    $('#operator').val('*');
    $('#calculate').trigger('click');

    deepEqual($('#history > li').length, 2, 'should be 1 LIs');
    deepEqual($('#history > li:first-child > span').length, 6, 'should be 6 spans');
    ok($('#history > li:first-child > span:first-child').hasClass('op1'), 'should have op1 class');
    ok($('#history > li:first-child > span:nth-child(2)').hasClass('operator'), 'should have operator class for 2nd span');
    ok($('#history > li:first-child > span:nth-child(3)').hasClass('op2'), 'should have op2 class for 3rd span');
    ok($('#history > li:first-child > span:nth-child(4)').hasClass('equal'), 'should have equal class for 4th span');
    ok($('#history > li:first-child > span:nth-child(5)').hasClass('result'), 'should have result class for 5th span');
    deepEqual($('#history > li:first-child > span:nth-child(1)').text(), '7', 'should have 7 in the top row for op1');
    deepEqual($('#history > li:first-child > span:nth-child(2)').text(), '*', 'should have * in the top row for operator');
    deepEqual($('#history > li:first-child > span:nth-child(3)').text(), '8', 'should have 8 in the top row for op2');
    deepEqual($('#history > li:first-child > span:nth-child(4)').text(), '=', 'should have = in the top row for equal');
    deepEqual($('#history > li:first-child > span:nth-child(5)').text(), '56', 'should have 56 in the top row for result');
  });

test('Remove Row', function(){
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('5');
  $('#op2').val('4');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  deepEqual($('#history > li').length, 3, 'should be 3 results');
  deepEqual($('#history > li:first-child > .result').text(), '1', 'should have 1 in top row for result');

  $('#history > li:nth-child(1) > .delete').trigger('click');

  deepEqual($('#history > li').length, 2, 'should be 2 results');
  deepEqual($('#history > li:first-child > .result').text(), '56', 'should have 56 in top row for result');
});


test('Alternating Row Colors', function(){
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('5');
  $('#op2').val('4');
  $('#operator').val('-');
  $('#calculate').trigger('click');

  deepEqual($('#history > li:first-child').css('background-color', 'rgb(247,148,67)', 'rgb(247,148,67)', 'should be orange background-color'));
  deepEqual($('#history > li:nth-child(2)').css('background-color', 'rgb(214,167,129)', 'rgb(214,167,129)', 'should be brown background-color'));

  $('#history > li:nth-child(1) > .delete').trigger('click');

  deepEqual($('#history > li:first-child').css('background-color', 'rgb(247,148,67)', 'rgb(247,148,67)', 'should be orange background-color'));
  deepEqual($('#history > li:nth-child(2)').css('background-color', 'rgb(214,167,129)', 'rgb(214,167,129)', 'should be brown background-color'));
});

test('Summing Totals', function(){
  expect(2);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#sum-button').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#sum-button').trigger('click');

  $('#op1').val('5');
  $('#op2').val('4');
  $('#operator').val('-');
  $('#sum-button').trigger('click');

/* SCRIPT:
need to remove value from the h3 containing total and make initial value 0
test that the value is 0 before click
test that the value is 60
*/
  deepEqual($('#sum').text(), '0', 'should have 0 in the sum h3');

  $('#sum-button').trigger('click');

  deepEqual($('#sum').text(), '60', 'should have 60 in the sum h3');
});

test('Multiplying Totals', function(){
  expect(2);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#product-button').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#product-button').trigger('click');

  $('#op1').val('5');
  $('#op2').val('4');
  $('#operator').val('-');
  $('#product-button').trigger('click');

  deepEqual($('#product').text(), '0', 'should have 0 in the product h3');

  $('#sum-button').trigger('click');

  deepEqual($('#product').text(), '280', 'should have 280 in the product h3');
});


test('Removing Negatives', function(){
  expect(2);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#negative').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#negative').trigger('click');

  $('#op1').val('5');
  $('#op2').val('4');
  $('#operator').val('-');
  $('#negative').trigger('click');

  deepEqual($('#history > .result').text(), 'CAN BE ANYTHING?', 'can have any value in result span');

  $('#negative').trigger('click');

  deepEqual($('#history > .result').text(), '.result.text() > 0???', 'values cannot be negative in result span');
});


test('Removing Positives', function(){
  expect(2);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#positive').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#positive').trigger('click');

  $('#op1').val('5');
  $('#op2').val('4');
  $('#operator').val('-');
  $('#positive').trigger('click');

  deepEqual($('#history > .result').text(), 'CAN BE ANYTHING?', 'can have any value in result span');

  $('#positive').trigger('click');

  deepEqual($('#history > .result').text(), '.result.text() < 0???', 'values cannot be positive in result span');
});