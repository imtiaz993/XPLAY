
let add=document.querySelector('#add');
let videoName=document.querySelector('#name');
let VideoURL=document.querySelector('#url');
let videolist=document.querySelector('.list-container');
let modal=document.querySelector('login-box')
let close=document.querySelector('.modal__close')


let playdeletelistner=document.querySelector('.list-container')
let currentsong=document.querySelector('.player-footer span')
let light=document.querySelector('.fa-sun-o');
let dark=document.querySelector('.fa-moon-o');




class Songs{
    constructor(name,url){
        this.name=name;
        this.url=url;
    }
}

let addStore=(item)=>{
    let items;
    if(localStorage.getItem('items') === null){
      items = [];
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
    } else {
      items = JSON.parse(localStorage.getItem('items'));
      items.push(item);
      localStorage.setItem('items', JSON.stringify(items));
    }
}

let getStore=()=>{
    let items;
    if(localStorage.getItem('items')===null){
        items = [{"name":"On My Way - Sample Video","url":"https://www.youtube.com/embed/xJPphZb0NbA"}];
        console.log("STARTED")
      localStorage.setItem('items', JSON.stringify(items));

    }
    if(localStorage.getItem('items') === null){
        
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
  
}
window.addEventListener('DOMContentLoaded', (event) => {
    
    let songs=getStore();
   if(songs.length!==0){

    songs.forEach(element => {
        var newVideo=document.createElement('div');
        newVideo.className='list';
        newVideo.innerHTML=`<span>${element.name}</span>  <i class="fa  fa-times" aria-hidden="true"></i>`
        videolist.appendChild(newVideo); 
        document.querySelector('iframe').src=songs[0].url
        currentsong.innerText=songs[0].name

    });
   }
   if(songs.length===0){
       
    var newVideo=document.createElement('div');
    newVideo.className="empty"
    newVideo.innerHTML=`No Song In the List` 
    videolist.appendChild(newVideo); 
   }
});



add.addEventListener('click',()=>{
    document.querySelector('.list-container').style.height="46%"
    document.querySelector('.addSong').style.display='block'
    document.querySelector('.plus').style.display='none'
   
  
})
document.querySelector('.submitIT').addEventListener('click',()=>{
   
    if(videoName.value!=='' && VideoURL.value!==''){
        const myArray = VideoURL.value.split("/");
        const link =myArray.length;
        console.log(document.querySelector('input[type=radio]'))
        let plateform =document.querySelector('input[type=radio]:checked').value;
        let myurl;
        switch (plateform) {
            case "youtube":
                myurl="https://www.youtube.com/embed/"+myArray[link-1]
                break;
                //src="https://player.vimeo.com/video/396260082?h=2760aaed30"
       //"https://www.dailymotion.com/embed/video/x8611u6
       //https://dai.ly/x8611u6

       //https://web.facebook.com/watch/?v=1393626100686564
                case "vimeo":
                    myurl="https://player.vimeo.com/video/"+myArray[link-1]
                break;
                case "dailymotion":
                    myurl="https://www.dailymotion.com/embed/video/"+myArray[link-1]
                break;
                
        
            default:
                break;
        }
        
       
        
        console.log(myurl)
        let obj=new Songs(videoName.value,myurl);
        console.log(obj)
        addStore(obj);
        document.location.reload();
        
        let store=getStore()
        if(store.length===1){
            document.querySelector('iframe').src=store[0].url
            currentsong.innerText=store[0].name
        }
       
         
    }
    else{
        console.log("Dont")
      
      
    }
    document.querySelector('.list-container').style.height="84%"
    videoName.value='';
    VideoURL.value='';
    
})
document.querySelector('.close').addEventListener('click',()=>{
    document.querySelector('.list-container').style.height="84%"
    document.querySelector('.addSong').style.display='none'
    document.querySelector('.plus').style.display='block'
})

playdeletelistner.addEventListener('click',(e)=>{
    let deletevideo=document.querySelectorAll('.fa-times')
let playsong=document.querySelectorAll('.list')
let playsong1=document.querySelectorAll('.list span')

for(var i=0;i<playsong.length;i++){
    
    if(e.target===playsong[i] || e.target===playsong1[i]){
        console.log(e.target.firstChild)
        let store=getStore();
        store.forEach(innerelement => {
            if(e.target.innerText===innerelement.name){
                document.querySelector('iframe').src=innerelement.url+"?autoplay=1";
               
                
            }
        });
        
        currentsong.innerText=playsong[i].innerText;
       
    }
}
 

  for(var i=0;i<deletevideo.length;i++){
    if (e.target===deletevideo[i]){
        console.log("delete")
        let thisSongParent=e.target.parentNode;
        let thisSong=thisSongParent.firstChild.innerText
        e.target.parentNode.remove() 
        let newList=getStore();

        newList.forEach((innerelement,index) => {
            console.log(thisSong)
            console.log(innerelement.name)
            if(thisSong==innerelement.name)
            {
                newList.splice(index, 1);
               
               
            }
            
        });
        
        document.location.reload();
        localStorage.setItem('items', JSON.stringify(newList));
        
            if(newList.length==0){
                document.querySelector('.empty').style.display="block"
                document.querySelector('iframe').src=""; 
                
                currentsong.innerText="Song Name";
            }
            
          
            
        
        
        
    }
  }

  


})
light.addEventListener('click',()=>{
  
    light.style.borderRadius = '10px 0px 0px 10px';
    light.style.boxShadow= '0px 2px 8px rgb(42, 42, 42)';
    light.style.fontSize= '14px';
    light.style.fontWeight='bolder';

    dark.style.borderRadius = '0px';
    dark.style.boxShadow= '0px 0px 0px rgb(255, 255, 255)';
    dark.style.fontSize= '10px';
    dark.style.fontWeight='normal';


     document.querySelector('.main-container').style.backgroundColor="white"
    document.querySelector('.main-container').style.color="black"
    document.querySelector('.appbar').style.color="black";
    document.querySelector('.mode').style.backgroundColor="whitesmoke"
    document.querySelector('.appbar').style.backgroundColor="white";
    document.querySelector('.video-list h4').style.color="black"
    document.querySelector('.video-list h4').style.borderColor="black"
    document.querySelector('.video-list h4 a').style.color="black"
    document.querySelector('.video-list').style.backgroundColor="white"
    document.querySelector('.player-footer').style.backgroundColor="white"

    
    console.log( document.querySelector('.addSong'))
    document.querySelector('.addSong').style.backgroundColor="white"
    document.querySelectorAll('.addSong input').forEach(element => {

        element.style.color="black"
    });
    document.querySelectorAll('.addSong a').forEach(element => {

        element.style.color="black"
        element.style.borderColor="black"
    });
})
dark.addEventListener('click',()=>{
    dark.style.borderRadius = '0px 10px 10px 0px';
    dark.style.boxShadow= '0px 2px 8px rgb(42, 42, 42)';
    dark.style.fontSize= '16px';
    dark.style.fontWeight='bolder';
    

    light.style.borderRadius = '0px';
    light.style.boxShadow= '0px 0px 0px rgb(255, 255, 255)';
    light.style.fontSize= '10px';
    light.style.fontWeight='normal';
   

    document.querySelector('.main-container').style.backgroundColor="black"
    document.querySelector('.main-container').style.color="white"
    document.querySelector('.appbar').style.color="white";
    document.querySelector('.mode').style.backgroundColor="gray"
    document.querySelector('.appbar').style.backgroundColor="rgba(40,40,40)";
    document.querySelector('.video-list h4').style.color="white"
    document.querySelector('.video-list h4').style.borderColor="white"
    document.querySelector('.video-list h4 a').style.color="white"
    document.querySelector('.video-list').style.backgroundColor="rgb(0,0,0)"
    document.querySelector('.player-footer').style.backgroundColor="rgba(20,20,20)"
    
    console.log( document.querySelector('.addSong'))
    document.querySelector('.addSong').style.backgroundColor="rgba(70,70,70)"
    document.querySelectorAll('.addSong input').forEach(element => {

        element.style.color="white"
    });
    document.querySelectorAll('.addSong a').forEach(element => {

        element.style.color="white"
        element.style.borderColor="white"
    });

   
    
})