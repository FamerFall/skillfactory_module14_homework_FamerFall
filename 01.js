const parser = new DOMParser();

const xmlString = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>
`;

// console.log('xmlString', xmlString);

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const list = xmlDOM.querySelector('list');
const studentNodeEn = list.querySelector('list > student');
// console.log(studentNodeEn.innerHTML);
const nameNodeEn = studentNodeEn.querySelector("name");
const firstNodeEn = nameNodeEn.querySelector("first");
const secondNodeEn = nameNodeEn.querySelector("second");
const ageNodeEn = studentNodeEn.querySelector("age");
const profNodeEn = studentNodeEn.querySelector("prof");

const langAttrEn = nameNodeEn.getAttribute('lang');



const studentNodeRu = list.querySelector('list > student:last-child');
// console.log(studentNodeRu.innerHTML)
const nameNodeRu = studentNodeRu.querySelector("name");
const firstNodeRu = nameNodeRu.querySelector("first");
const secondNodeRu = nameNodeRu.querySelector("second");
const ageNodeRu = studentNodeRu.querySelector("age");
const profNodeRu = studentNodeRu.querySelector("prof");

const langAttrRu = nameNodeRu.getAttribute('lang');


let arr = [];

 arr.push( {
        lang: langAttrEn,
        first: firstNodeEn.textContent,
        second: secondNodeEn.textContent,
        age: ageNodeEn.textContent,
        pro: profNodeEn.textContent,
      }
    );
        
 arr.push( {
      lang: langAttrRu,
      first: firstNodeRu.textContent,
      second: secondNodeRu.textContent,
      age: ageNodeRu.textContent,
      pro: profNodeRu.textContent,
     }
    );

const result = {};
result["list"] = arr;

console.log('result', result);