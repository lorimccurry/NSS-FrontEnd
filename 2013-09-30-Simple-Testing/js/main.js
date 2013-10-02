function add_three(n) /*take input and add 3 to it*/
{
  return n + 3;
}

function square(n)
{
  return n * n; /*or Math.pow(n, 2)*/
}

function area(l, w)
{
  return l * w;
}

function volume(l, w, h)
{
  return area(l, w) * h; /*re-use fn above...could type formula out normally*/
}

power(2,3);

function power(base, exp)
{
  var product = 1; /*need a temp var equal to 1 so can run through starting at 1*/

  for (var i = 0; i < exp; i++)
    product *= base;

  return product;
};

function greeting(salutation, name)
{
  return salutation + ", " + name + "!";
}

function pig_latin(string)
{
  return string.slice(1) + string[0] + 'a';
}

function pig_greeting(salutation, name)
{
  return pig_latin(salutation) + ", " + pig_latin(name) + "!";
}

pig_sentence('saying hello in pig latin')
function pig_sentence(sentence)
{
  var words = sentence.split(" ");
  var pig_words = [];

  for(i = 0; i < words.length; i++)
    pig_words.push(pig_latin(words[i]));

  return pig_words.join(" ");
}