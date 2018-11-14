$(document).ready(()=>{
let minewidth = 40;
let mineheight = 30;
let bombnumber = 200;
let BtnCount=0;
let minecount = mineheight*minewidth;
let RandomBombNumber= [];
let grid =[];
let zeros=[];
let finished=[];
let bombsleft = bombnumber;
var clock = setInterval(myTimer, 1000);
let time= 0;
        function myTimer() {
            time +=1;
            $(".time").text("Time: "+time);
        }
let toptime = 1000000000;




CreateNewGame();

function CreateNewGame(){
clearInterval(clock);
time=0;
$(".time").text("Time: "+time);
TimerStarted = false;
BtnCount=0;
 minecount = mineheight*minewidth;
 RandomBombNumber= [];
 grid =[];
 zeros=[];
 finished=[];
 bombsleft = bombnumber;
$(".bombsleft").text("Bombs left:  "+bombsleft);

$("#game-area").empty(); 
   
for(let i=0;i<mineheight+2;i++){ //make grid data structure, location in array is location in grid, 
    grid[i]=[];
    for(let j=0;j<minewidth+2;j++){
        grid[i][j]=[0,0,0]
    }
}





for(let i=1;i<=minecount;i++){ //make randpm bomb array
RandomBombNumber.push(i);
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
RandomBombNumber = shuffle(RandomBombNumber);
RandomBombNumber = RandomBombNumber.slice(0,bombnumber);






for(let i=1;i<=mineheight;i++){// Create board with buttons
    let div = document.createElement('div');
    $(div).addClass("buttonrow");
    document.getElementById('game-area').appendChild(div);
    for(let j=1;j<=minewidth;j++){
        BtnCount+=1;
        let btn = document.createElement('div');
        btn = $(btn);
        btn.addClass("gamebtn");
        $(div).append(btn);
        //btn.type="button";
        (btn).data("gridlocation",[i,j,RandomBombNumber.includes(BtnCount)]);
        (btn).data("isbomb",RandomBombNumber.includes(BtnCount))
        if(RandomBombNumber.includes(BtnCount)){
        grid[i+1][j+1][0]+=1;
        grid[i+1][j][0]+=1;
        grid[i+1][j-1][0]+=1;
        grid[i][j+1][0]+=1;
        grid[i][j-1][0]+=1;
        grid[i-1][j+1][0]+=1;
        grid[i-1][j][0]+=1;  
        grid[i-1][j-1][0]+=1;      
        }
        grid[i][j][2]=btn;
   }
}









$('.gamebtn').click(function(e){
    if(!TimerStarted){
        TimerStarted=true;
        clock = setInterval(myTimer, 1000);
         time= 0;
        function myTimer() {
            time +=1;
            $(".time").text("Time: "+time);
        }
    }
    btn=$(e.currentTarget);
    let i=$(btn).data('gridlocation')[0];
    let j=$(btn).data('gridlocation')[1];
    if(e.shiftKey){ // shift click toggles flag
        if(btn.hasClass("Cleared")){
        }
        else if(btn.hasClass("flagged")){
         $(e.currentTarget).removeClass("flagged");
        grid[i+1][j+1][1]-=1;
        grid[i+1][j][1]-=1;
        grid[i+1][j-1][1]-=1;
        grid[i][j+1][1]-=1;
        grid[i][j-1][1]-=1;
        grid[i-1][j+1][1]-=1;
        grid[i-1][j][1]-=1;  
        grid[i-1][j-1][1]-=1; 
        bombsleft-=1;
        $(".bombsleft").text("Bombs left:  "+bombsleft);
        
        }
        else{
        $(e.currentTarget).addClass("flagged");
        grid[i+1][j+1][1]+=1;
        grid[i+1][j][1]+=1;
        grid[i+1][j-1][1]+=1;
        grid[i][j+1][1]+=1;
        grid[i][j-1][1]+=1;
        grid[i-1][j+1][1]+=1;
        grid[i-1][j][1]+=1;  
        grid[i-1][j-1][1]+=1; 
        bombsleft -=1;
        $(".bombsleft").text("Bombs left:  "+bombsleft);
        }
    }
   
   
    else if(btn.hasClass("flagged")){ // flagged stops regular clicking
    }
    
    else if($(e.currentTarget).data('gridlocation')[2]){ // bomb ends game
    gameover();
}
    
    
    
    else if(grid[i][j][0]==0||(btn.hasClass("Cleared")&&grid[$(btn).data('gridlocation')[0]][$(btn).data('gridlocation')[1]][0]==grid[$(btn).data('gridlocation')[0]][$(btn).data('gridlocation')[1]][1])){
        for(k=-1;k<=1;k++){
            for(l=-1;l<=1;l++){
                let a = grid[i+k][j+l];
                if(i+k<1||j+l<1||i+k>mineheight||j+l>minewidth||a[2]==0){
                }
                else {if(!$(a[2]).hasClass('flagged')){

                
                $(a[2]).addClass("Cleared");

                if(a[2].data('isbomb')){
                    gameover();

                
                }
                else if(!a[0]==0){//if not zero
                  $(a[2]).html(a[0]);   
                }
                else {//if is zer0
                    $(a[2]).addClass("Click");
                    zeros.push(a[2]);
                    
                }
            }
            }}
        }
     presss();
    }
    else{
        e.currentTarget.innerHTML = grid[$(e.currentTarget).data('gridlocation')[0]][$(e.currentTarget).data('gridlocation')[1]][0];
        $(e.currentTarget).addClass("Cleared");
        if($(".Cleared").length >=mineheight*minewidth-bombnumber){
            gameover()
            }
            
        
}

})


function presss(){
while(zeros.length>0){
    fakeclick(zeros.pop());

}

if($(".Cleared").length >=mineheight*minewidth-bombnumber){
    gameover();
}
}

function fakeclick(butn){
    if(butn)
    btn = $(butn);
    let i=$(btn).data('gridlocation')[0];
    let j=$(btn).data('gridlocation')[1];
    finished.push(butn);  
    if(finished.includes(butn)){
    }
    for(k=-1;k<=1;k++){
                    for(l=-1;l<=1;l++){

                        if(i+k<1||j+l<1||i+k==mineheight+1||j+l==minewidth+1){
                        }
                        else{
                        let b = grid[i+k][j+l];
                        $(b[2]).addClass("Cleared");
                        

                    
                            if(!$(b[2]).hasClass("flagged")&&!b[0]==0){
                            $(b[2]).html(b[0]); 
                            }
                            else{
                                if(!finished.includes(b[2])&&!zeros.includes(b[2])){
                                    zeros.push(b[2]);
                                }
                            }
                        
                    }}
}

}
function gameover(){
    clearInterval(clock);

    if($(".Cleared").length ==mineheight*minewidth-bombnumber){
        alert("you win!")
        toptime = Math.min(toptime,time);
        $(".top3").text("High Score: "+toptime);
    }
    for(x=1;x<mineheight+1;x++){
        for(y=1;y<minewidth+1;y++){
            if($(grid[x][y][2]).data("isbomb")){
                $(grid[x][y][2]).addClass("bomb");
            }
            else if(grid[x][y][0]!=0){
            $(grid[x][y][2]).html(grid[x][y][0]);}

        }
    }

}

}


$(".newGame").click(function(e){
bombnumber = $(document.getElementsByClassName("mines"))[0].value;
mineheight = $(document.getElementsByClassName("height"))[0].value;
minewidth = $(document.getElementsByClassName("width"))[0].value;
if(mineheight<10){
    mineheight = 10;
}
if(minewidth<10){
    minewidth = 10;
}
if(mineheight>30){
    mineheight=30;
}
if(minewidth>40){
    minewidth=40;
}
if(bombnumber>=mineheight*minewidth){
    bombnumber = mineheight*minewidth-1;
}
if(bombnumber<1){
    bombnumber=1;
}
CreateNewGame();


})

 })