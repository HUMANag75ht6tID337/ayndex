var a = [0, 0, 0];
var b = [0, 0, 0];
var mex = 0;
var mey = 0;
var mez = 0;
var meb = [0, 0, 0];
var ab = [0, 0, 0];
var ame = [0, 0, 0];
var angle = 0;
var time = 0;

function random_angle() {
	var list = [-14, -11, -9, -5, 7, 9, 11, 14, 17]
	return list[math.random_int(0, 8)];
}

function antibrute() {
        var curtime = global_vars.tick_count();
        if (curtime - time == global_vars.tick_count()) {
            time = global_vars.tick_count();
        }
        if ((global_vars.tick_count() - time) >= 15) {
            time = 0;
			vars.set_int("antiaim.trigger[4].jitter_angle", random_angle()-3);
			vars.set_int("antiaim.trigger[4].spin_range", Math.abs(random_angle())+11);
			vars.set_int("antiaim.trigger[4].spin_speed", math.random_int(5, Math.abs(vars.get_int("antiaim.trigger[4].spin_range"))+7));
			vars.set_int("antiaim.trigger[4].yaw_add", vars.get_int("antiaim.trigger[4].jitter_angle")*-0.5);
		}
}

register_callback("bullet_impact", function() {
	if (entity.get_player_for_user_id(current_event.get_int("userid")) != entity.get_local_player()) {
		a = [current_event.get_float("x"), current_event.get_float("y"), current_event.get_float("z")];
		b = [entity.get_origin(entity.get_player_for_user_id(current_event.get_int("userid")))[0], entity.get_origin(entity.get_player_for_user_id(current_event.get_int("userid")))[1], entity.get_origin(entity.get_player_for_user_id(current_event.get_int("userid")))[2]+58];
		mex = entity.get_origin(entity.get_local_player())[0];
		mey = entity.get_origin(entity.get_local_player())[1];
		mez = entity.get_origin(entity.get_local_player())[2]+48;
		meb = [b[0]-mex, b[1]-mey, b[2]-mez];
		ab = [b[0]-a[0], b[1]-a[1], b[2]-a[2]];
		ame = [a[0]-mex, a[1]-mey, a[2]-mez];
		var lename = Math.sqrt(ame[0]*ame[0]+ame[1]*ame[1]+ame[2]*ame[2]);
		var lenmeb = Math.sqrt(meb[0]*meb[0]+meb[1]*meb[1]+meb[2]*meb[2]);
		var lenab = Math.sqrt(ab[0]*ab[0]+ab[1]*ab[1]+ab[2]*ab[2]);
		var cosa = (lenmeb*lenmeb+lenab*lenab-lename*lename)/(2*lenmeb*lenab);
		angle = Math.acos(cosa)*180/Math.PI;
		var h = Math.sin(angle)*lenmeb;
		if (Math.abs(h) < 300) 
		antibrute();
	}
});