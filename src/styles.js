export function setGlobalStyles() {
    document.body.insertAdjacentHTML("beforeend", `
                <style>
                    .battle_examples_container {
                        display: flex;
                        width: 100%;
                        justify-content: space-evenly;
                    }
                    @media (max-width: 800px) {
                        .battle_examples_container {
                            flex-direction: column;
                            justify-content: center;
                        }
                    }
                
                    .btn_hover2{
                        transition: -webkit-filter .3s;
                        transition: filter .3s;
                    }
                    .btn_hover2:hover{
                        cursor: pointer;
                        -webkit-filter: brightness(125%) drop-shadow(0 0 5px #ffe4b3);
                         filter: brightness(125%) drop-shadow(0 0 5px #ffe4b3);
                    }
                    .home_button2{
                        padding: 2px 4px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        image-rendering: -webkit-optimize-contrast;
                        image-rendering: optimizeQuality;
                        color: #592C08;
                        font-family: verdana,geneva,arial cyr;
                        -webkit-user-select: none;
                        position: relative;
                        font-size: 100%;
                        text-align: center;
                        font-weight: bold;
                        cursor: pointer;
                        background: url(../i/homeico/art_btn_bg_gold.png) #DAB761;
                        background-size: 100% 100%;
                        border-radius: 5px;
                        box-shadow: inset 0 0 0 1px #fce6b0,
                            inset 0 0 0 2px #a78750,
                            0 0 0 1px rgba(0,0,0,.13);
                        line-height: 25px;
                    }
                    input[id^="spoiler"] {
                        display: none;
                    }
        
                    input[id^="spoiler"] + label {
                        display: block;
                        text-align: center;
                        font-size: 14px;
                        cursor: pointer;
                        transition: all .6s;
                    }
        
                    input[id^="spoiler"] ~ .spoiler {
                        display: none;
                        opacity: 0;
                        transition: all .6s;
                    }
        
                    input[id^="spoiler"]:checked + label + .spoiler {
                        display: block;
                        opacity: 1;
                        width: 100%;
                    }
                    
                    .roguesSpoilerWrapper{
                       width: 100%;
                       display: flex;
                       flex-direction: column;
                    }
                    .roguesSpoilerLabel{
                       width: 100%;
                       display: flex !important;
                       justify-content: center;
                    }
                    
                     .record-wrapper{
                        display: flex;
                        flex-direction: column;
                    }
                    .record-container {
                        display: flex;
                        flex-wrap: nowrap;
                        width: 100%;
                        overflow: auto;
                        margin-top: 4px;
                    }
                    .record-wrapper + .record-wrapper {
                        border-top: 2px solid black;
                    }
        
                    .record-players, .record-number {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
        
                    .record-number {
                        font-weight: bold;
                        font-size: 18px;
                        flex-direction: column;
                    }
                    
                    .record-players {
                        flex-direction: column;
                        padding: 4px;
                    }
        
                    .record-players-creatures {
                        display: flex;
                        flex-wrap: nowrap;
                    }
                    .record-players-arms {
                        height: 40px;          
                    }
                    .record-player-creatures {
                        display: flex;
                    }
                    
                    .player-creatures-row {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        justify-content: center;
                    }
                    .creatures-checkers {
                        display: flex;
                        justify-content: space-around;
                    }
                    .creatures-apply {
                        display: flex;
                        flex-direction: column-reverse;
                        justify-content: space-evenly;
                        padding: 4px;
                    }
                    .player-leadership {
                        display: flex;
                        align-items: center;
                    }
        
                    .records-container-header {
                        /*background: url("https://media3.giphy.com/media/YFFG4W2MvihirVoSQU/giphy.gif") repeat;*/
                        background-size: 6%;
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                        justify-content: center;
                        width: 100%;
                    }
        
                    .records-container-header > div {
                        padding: 10px;
                        background: #f8f8f2;
                        border-radius: 20px;
                        border: 2px solid rgb(26,55,86);
                    }
        
                    .records-container-body {
                        display: flex;
                        flex-direction: column;
                        margin-top: 10px;
                        width: 670px;
                    }
        
                    .record-result {
                        display: flex; 
                        justify-content: center; 
                        align-items: center
                    }
                    .record-result > div {
                        margin: 5px 5px 5px 0;
                        display: flex;
                        align-items: center;
                    }
                    .record-result img {
                        height: 24px; 
                        vertical-align: middle
                    }
                    .record-result span {
                        font-weight: bold
                    }
                    .custom-creature {
                       width: 40px;
                    }
                    .custom-creature > img {
                        border-radius: 50%;
                        border: 1px solid #747474;
                        width: 50px;
                        height: 50px;
                        object-fit: cover;
                    
                    }
                    .custom-amount {
                        right: unset;
                        left: calc(50% - (12px));
                        bottom: -0.3em;
                        width: 40px;
                        text-align: center;
                    }
                    .good-creature {
                        cursor: pointer;
                    }
                    .bad-creature {
                        color: #ff5050;
                        cursor: pointer;
                    }
                    
                    .special-creature {
                       margin-left: 20px;
                       display: flex;
                    }
                    .special-creature-info{
                        display: flex;
                        justify-content: space-between;
                    }
                    
                    .special-creature-info-button{
                        cursor:pointer;
                        z-index: 1;
                    }
                    .special-creature-info-button:hover {
                        filter: brightness(1.25);
                    }
                    .special-creature-stats {
                        display: flex;
                        flex-direction: column;
                        margin-top: 2px;
                    }
                    .special-creature-stats > div {
                        display: flex;
                        justify-content: space-between;
                        height: 25px;
                    }
                    .special-creature-stats > div > div {
                        display: flex;
                    }
                    .special-creature-stat-icon{
                        vertical-align: bottom;
                        height: 20px;
                        filter: drop-shadow(0.01rem 0.01rem 0 #747474) drop-shadow(-0.01rem -0.01rem 0 #747474);
                    }
                    .special-creature-stat-value {
                        font-size: 14px;
                        font-weight: bold;
                    }
                    .special-creature-extended {
                        display: none;
                    }
                    .visible{
                        display: block;
                    }
                    .failed-records-wrapper {
                        display: flex;
                        justify-content: center;
                    }
                    .failed-records-container {
                        display: flex; 
                        flex-direction: column;
                        width: fit-content;
                    }
                    
                    
                    .faction-hunt-data {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: nowrap;
                    }
                    .btn_hover2{
                        transition: -webkit-filter .3s;
                        transition: filter .3s;
                    }
                    .btn-gradient {
                        text-decoration: none;
                        color: white;
                        padding: 5px;
                        display: inline-block;
                        cursor: pointer;
                        position: relative;
                        border: 1px solid rgba(0,0,0,0.21);
                        border-bottom: 4px solid rgba(0,0,0,0.21);
                        border-radius: 4px;
                        text-shadow: 0 1px 0 rgba(0,0,0,0.15);
                        user-select: none;
                    }
        
                    .btn-gradient.blue:active {background: #608FBF;}
                    .btn-gradient.blue {
                        background: rgba(102,152,203,1);
                        background: linear-gradient(to bottom, rgba(102,152,203,1) 0%, rgba(92,138,184,1) 100%);
                        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#6698cb', endColorstr='#5c8ab8', GradientType=0 );
                    }
                    
                    
                    .progress {
                        font-size: 14px !important;
                        text-shadow: none;
                    }
                    
                    .wrapper {
                        color: black;
                        letter-spacing: 1px;
                        display: flex;
                        justify-content: center;
                    }
                    .wrapperStat {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        text-align: center;
                        align-items: center;
                    }
                    .wrapperStat > div {
                       margin-bottom: 5px;
                    }
                    
                    /* custom scrollbar */
                    .record-container::-webkit-scrollbar {
                      width: 20px;
                    }
                    
                    .record-container::-webkit-scrollbar-track {
                      background-color: transparent;
                    }
                    
                    .record-container::-webkit-scrollbar-thumb {
                      background-color: #d6dee1;
                      border-radius: 20px;
                      border-top: 6px solid transparent;
                      border-bottom: 6px solid transparent;
                      background-clip: content-box;
                    }
                    
                    .record-container::-webkit-scrollbar-thumb:hover {
                      background-color: #a8bbbf;
                    }
                    
                    
                    .battle_info_chip {
                        padding: 4px;
                        border: 2px solid #776c6c;
                        margin: 2px;
                        border-radius: 10px;
                        font-size: 20px;
                        background-color: #dbdad8;
                        background-image: url(https://cfcdn.lordswm.com/i/art_fon_100x100.png);
                        background-origin: border-box;
                    }
                    
                    .battle_art_chip {
                        
                        position: relative; 
                        height: 50px; 
                        width: 50px
                    }
                    
                    .art_img {
                        width: 50px;
                        height: 50px;
                        position: absolute;
                        top: 4px;
                        left: 4px;
                    }
                    .art_mods_container {
                        height: 10px;
                        bottom: 0;
                        position: absolute;
                        z-index: 1;
                        display: inline-block;
                        white-space: nowrap;
                        text-align: right;
                        width: 50px
                    }
                </style>
            `)
}
