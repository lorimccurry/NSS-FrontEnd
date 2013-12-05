'use strict';

// Local Schema (defined in keys.js)
var schools = [];

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#add-school').click(clickAddSchool);
  $('#add-student').click(clickAddStudent);
  $('#add-subject').click(clickAddSubject);
}

function clickAddSchool(){
  var name = getValue('#school');
  var length = getValue('#length');
  var width = getValue('#width');
  var school = new School(name, length, width); //making a specific object called 'School' that got created from its class; pulling values from input and passing them down to make object properties
  var dog = {name: 'fido'}; //making a generic object called 'Object'
  schools.push(school);
  htmlAddSchoolToSelect(school);
}

function clickAddStudent(){
  var name = getValue('#student');
  var gpa = getValue('#gpa', parseFloat);
  var schoolName = $('#pick-school').val();

  var school = _.find(schools, function(s){
    return s.name === schoolName;
  });

  var student = new Student(name, gpa); //student goes inside school object which is inside schools array
  school.students.push(student);
  htmlAddStudentToSelect(student);

}

function clickAddSubject(){
  debugger;
  var subjectName = getValue('#subject');
  var studentName = $('#pick-student').val();

  var school = _.find(schools, function(sch){
    return _.find(sch.students, function(stu){
      return stu.name === studentName;
    });
  });

  var student = _.find(school.students, function(stu){return stu.name === studentName;});
  var subject = new Subject(subjectName);
  student.subjects.push(subject);
}

//----------------------------------------------------------------------//
//CLASSES DEFINED HERE //

//a factory that will make new objects
function School(name, length, width){
  this.name = name;    //'this' corresponds to object you're about to create (like 'dog' or 'school')
  this.established = '1930';
  this.length = length;
  this.width = width;
  this.students = [];
  this.area = function(){return parseInt(this.length, 10) * parseInt(this.width, 10);}; //using prop of object to get area; prop are global to this fn
  this.gpa = function(){
    var sum = _.reduce(this.students, function(memo, student){return memo + student.gpa;}, 0);
    var total = this.students.length;
    return sum / total;
  };
}

function Student(name, gpa){
  this.name = name;
  this.gpa = gpa;
  this.subjects = [];

}

function Subject(name){
  this.name = name;
}
//----------------------------------------------------------------------//

//can generalize these 2 fn as well

function htmlAddSchoolToSelect(school){
  var $option = $('<option>');
  $option.text(school.name); //what shows on browser screen
  $option.val(school.name); //value stored in memory to call it by; usually db item it's associated w/
  $('#pick-school').append($option);
}

function htmlAddStudentToSelect(student){
  var $option = $('<option>');
  $option.text(student.name); //what shows on browser screen
  $option.val(student.name); //value stored in memory to call it by; usually db item it's associated w/
  $('#pick-student').prepend($option);
}


//----------------------------------------------------------------------//

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}


function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

