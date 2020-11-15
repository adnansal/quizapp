async function fetchMovies() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&category=10&encode=base64');
    // waits until the request completes...
    const questions= await response.json()   
    return   questions
  }


  var output=[]
  var rad=[]
  var page=[]
  var ans=[]
  var corre=[]
  fetchMovies()
  .then((data) => {

    for (let s of data.results){
        var arr=[]
        s.incorrect_answers.forEach(ele =>{
            arr.push(window.atob(ele))
        })
        arr.push(window.atob(s.correct_answer))
        corre.push(window.atob(s.correct_answer))
        shuffle(arr)
        var div=document.createElement("div")
        div.innerHTML=`${window.atob(s.question)} <br/> ${arr} ` 
        var divans =document.createElement("div")
        for (let g of arr){
            var label=document.createElement("label")
            var radio=document.createElement("input");
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", "options");
            radio.setAttribute("value", g);
            var span1=document.createElement("span");
            var span2=document.createElement("span");
            //span1.classList.add("opt")
            span2.innerText=g
            label.appendChild(radio)
            label.appendChild(span1)
            label.appendChild(span2)
            span2.classList.add("opt")
            divans.appendChild(label)
            divans.appendChild(document.createElement('br')) 
        }
        div.innerHTML=`${window.atob(s.question)}` 
        
        output.push(div)
        rad.push(divans)  
      }
}).then(()=>{
    var index=0
    var totalIndex=output.length-1
    function displayQuestion (index){
      if(index <= totalIndex){
        var q=document.querySelector('#q')
        var a=document.querySelector('#a')
        var s=document.querySelector('#numid')
        var pro=document.querySelector('.progress-bar')
        q.innerHTML=''
        a.innerHTML=''
        s.innerText=index+1+'/'+'10'
        pro.style.width=((index+1)*10)+'%'
        a.appendChild(rad[index])
        q.appendChild(output[index])
      }
/*       else{
        console.log(ans)
        console.log(corre)
      } */

    }
    displayQuestion(index)
    var button_1=document.querySelector('#next')
    var button=document.querySelector('#prev')
    var but_submit=document.querySelector('#sub')
    but_submit.disabled=true
    but_submit.addEventListener('click',function(){
      cnt=0
      var labe=document.querySelector('#label')
      var input=document.querySelectorAll('input')
      for(i=0;i<input.length;i++){
        if(input[i].checked){
          if(index<=totalIndex){
            ans[index]=input[i].value
          }  
        }
        else{
          cnt++
        }
        }
        if(cnt<4){
          count=0
          for(i=0;i<corre.length;i++){
            if(ans[i]==corre[i]){
              count++
            }
          }
          labe.innerText=count
        }
        else{
          alert("Please select and answer")
        }    
    })
    if(index <= 0){
      button.disabled=true
    }

    button_1.addEventListener('click',function(){
      cnt=0
      var input=document.querySelectorAll('input')
      if(index === totalIndex-1){
        button_1.disabled=true
        but_submit.disabled=false   
      }
      for(i=0;i<input.length;i++){
      if(input[i].checked){
        if(index<=totalIndex){
          ans[index]=input[i].value
        }  
      }
      else{
        cnt++
      }
      }
      if(cnt<4){
        index++
        if(index>0){
          button.disabled=false
        }          
        cnt=0
        displayQuestion(index)
        
      }
      else{
        cnt=0
        alert("Please select an answer")
        
      }
      
      
    })

    button.addEventListener('click',function(){
      index--
      if(index <= 0){
        button.disabled=true
      }
      if(index <= totalIndex){
        button_1.disabled=false
      }
      displayQuestion(index)
      var input=document.querySelectorAll('input')
      for(i=0;i<input.length;i++){
      if(input[i].value===ans[index]){
        input[i].setAttribute('checked', 'checked');
      }
      }
    })
})
  .catch(reason=>console.log(reason.message))

 
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

