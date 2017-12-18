//Main.js




let app = {
    INPUT: null,
    baseURL: 'https://api.themoviedb.org/3/',
    configData: null,
    baseImageURL: null,
    back: null,
    init: function () {
        
        app.INPUT = document.getElementById('search-input');
        app.INPUT.focus();
        
        app.back=document.getElementById('back-button');
        

        // listening for an enter or return
        
        let btn = document.getElementById('search-button');
        btn.addEventListener('click', app.getConfig);
        //listening for an enter or return
        document.addEventListener('keypress', function(ev){
            let char =ev.char || ev.charCode || ev.which;
            if(char== 10 || char==13){

                btn.dispatchEvent(new MouseEvent('click'));
            }
        })
    },
    getConfig: function(ev){
        let url= app.baseURL+'configuration?api_key='+ KEY;
        fetch(url)
        .then((result)=>{
            return result.json();
        })
        .then((data)=>{
            app.baseImageURL= data.images.secure_base_url;
            app.configData= data.images;

            return app.runSearch();
        })
        .catch(err =>{
            console.log("Something didnt work:",err);
        })
        
    },
    
    
    
    
    //function triggers fetch call for the Movie array with API key.
    runSearch: function(ev){

        if (app.INPUT.value){
            //if they actually typed something other than <enter> in search input
            let url= app.baseURL+"search/movie?api_key=" + KEY;
            url += "&query=" + app.INPUT.value;

            
            
            
            
            
            fetch(url)
            .then(response => response.json() )
            .then(data => {
                console.log(data);
                app.showMovieCards(data.results);
            })
           
            
            .catch( err => {
               console.log(err); 
            });
            
        }
    },
    
    
    
    //This function is to show movie cards.
    showMovieCards: function(movies){
        
        let section = document.querySelector('#search-results .content');
        let df = document.createDocumentFragment();
        section.innerHTML= "";
        movies.forEach((movie)=>{
            let searchDiv=document.createElement('div');
            let h2=document.createElement('h2')
            let oView=document.createElement('p');
            let img=document.createElement('img');
            let div2=document.createElement('div');
            div2.className="title_card";
            img.className="imgd"
            searchDiv.setAttribute('data-movie', movie.id);
            searchDiv.addEventListener('click', app.getRecommended);
            searchDiv.classList.add('movie');
            oView.textContent=movie.overview;
            //To get the title
            h2.textContent=movie.title;
            //To get the image
            img.src =app.baseImageURL+'w185'+movie.poster_path;
            searchDiv.appendChild(img);
            div2.appendChild(h2);
            div2.appendChild(oView);
            searchDiv.appendChild(div2);
            df.appendChild(searchDiv);
        });
        section.appendChild(df);
    },
    
    //this function gets recommended movies
    getRecommended: function(recommend){
        let movie_id=recommend.currentTarget.getAttribute('data-movie');
        let url=app.baseURL+'movie/'+movie_id+'/recommendations?api_key='+ KEY;
        
        fetch(url)
        .then(response=>response.json())
        .then((data)=>{
            console.log(data);
             if(data.results==0){
                 
            alert("There is no recommended movies for this title!");
        }else{
            console.log(movie_id);
            let sr=document.querySelector('#search-results .content');
            sr.innerHTML="";
            app.showRecommended (data.results);
        }
        })
        .catch(err=>
        console.log(err))  
        
    },
    //this function shows recommended movies
    showRecommended: function(recommendations){
        let recSection=document.getElementById('recommend-results');
        recSection.innerHTML= '';
        let df=document.createDocumentFragment();
        recommendations.forEach((movie)=>{
        let div=document.createElement('div');
        div.classList.add('movie');
        let h2=document.createElement('h2');
        let overview=document.createElement('p');
        let img=document.createElement('img');
        let div2=document.createElement('div');
        div2.className="title_card";
        img.className="imgd";
        h2.textContent=movie.title;
        overview.textContent=movie.overview;
            
        img.src=app.baseImageURL+"w185"+movie.poster_path;
        div.appendChild(img);
        div2.appendChild(h2);
        div2.appendChild(overview);
        div.appendChild(div2);
        df.appendChild(div);
            });
        recSection.appendChild(df);
        app.back.addEventListener('click', function goBack(){
            window.history.back();
        }
    )
    }
};

document.addEventListener('DOMContentLoaded', app.init);

//wait for DOMContentLoaded event
//fetch the configuration info for the image location and sizes
//focus on the text field
//listen for click on the search button
//listen for keypress and enter or return

//after the click / enter press run a fetch
//results come back from fetch
//show the movie results page
//loop through the results and build divs 

//make something in the div clickable 
//get the id from the clickable element
//fetch the recommendations based on the movie id







//https://image.tmdb.org/t/p/w500/
