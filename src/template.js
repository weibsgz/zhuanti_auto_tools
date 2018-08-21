let page=`
<!DOCTYPE html>
<html lang="en">
<head>     
    <meta charset="UTF-8">
    <meta name="keywords" content="{{@keyWords}}" />
    <meta name="description" content="{{@des}}" />
    <title>{{@title}}</title>
    {{each cssDepends}}
        <link rel="stylesheet" href="{{@$value}}">
    {{/each}}   
    <style type="text/css">
        *{margin:0;padding:0}
        .bg_imgs{position:absolute;top:0;left:0;width:100%;text-align:center}
        .bg_imgs div{width:100%;}
        .bg_imgs img{width:100%;display:block}
        {{@css}}
    </style>
    <script>{{@titleCode}}</script>
</head>
<body style="height:{{height}}px;position:relative;" >
<div style="width:{{mainWidth}}px;height:{{height}}px;position:absolute;left:50%;top:0;margin-left:-{{mainWidth/2}}px;z-index:2">
{{@body}}
</div>
<div class="bg_imgs">
{{each bgImg}}
    <div style="background:url({{@$value.src}}) no-repeat center top;height:{{@$value.height}}px"></div>
{{/each}}
</div>
{{each jsDepends}}
    <script src="{{@$value}}"></script>
{{/each}}
<script>{{@code}}</script>
</body>
</html>
`;






export default {
    page,
}