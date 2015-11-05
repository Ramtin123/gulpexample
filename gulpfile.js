var gulp=require('gulp');
var webserver=require('gulp-webserver');
var mainbowerfiles=require('main-bower-files');
var inject=require('gulp-inject');
var paths={
	index:'app/index.html',
	root:'root',
	rootVender:'root/vender'
	
};
gulp.task('default',['watch']);

gulp.task('scripts',function(){
	var rootindex=gulp.src(paths.index).pipe(gulp.dest(paths.root));
	var scripts=gulp.src('app/**/*.js').pipe(gulp.dest(paths.root));
	var vendorscripts=gulp.src(mainbowerfiles()).pipe(gulp.dest(paths.rootVender));
	return rootindex.pipe(inject(vendorscripts,{relative:true,name:'vendorinject'})).pipe(inject(scripts,{relative:true})).pipe(gulp.dest(paths.root));
});



gulp.task('watch',['serve'],function(){
	gulp.watch('app/**/*.js',['scripts']);
});


gulp.task('serve',['scripts'],function(){
	return gulp.src(paths.root).pipe(webserver({
		//open:true
		livereload:true
	}));
});