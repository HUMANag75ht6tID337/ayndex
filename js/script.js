
cheat.execute_command("sv_forcepreload 1");

var dttime = 0
var fdtime = 0
var aatime = 0
var aatick = 1
var newyaw = 0
var newsync = 0
var bruteyaw = 0
var step = 0
var brutek1 = 1
var brutek2 = 1
var brutek3 = 1
var brutek4 = 1
var brutek5 = 1
var brutek6 = 1
var lagtime = 0
var laglimit = 0
var dtwaiting = false
var fdwaiting = false
var time = 1
var interval = 0
var k = 1
var vel = [0, 0, 0]
var velhor = 0
var velvert = 0

function radian(degree) {
    return degree * Math.PI / 180.0;
};

function ExtendVector(vector, angle, extension) {
    var radianAngle = radian(angle);
    return [extension * Math.cos(radianAngle) + vector[0], extension * Math.sin(radianAngle) + vector[1], vector[2]];
};

function VectorAdd(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
};

function VectorSubtract(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function VectorMultiply(a, b) {
    return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
}

function VectorLength(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
}

function VectorNormalize(vec) {
    var length = VectorLength(vec[0], vec[1], vec[2]);
    return [vec[0] / length, vec[1] / length, vec[2] / length];
}

function VectorDot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function VectorDistance(a, b) {
    return VectorLength(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function ClosestPointOnRay(target, rayStart, rayEnd) {
    var to = VectorSubtract(target, rayStart);
    var dir = VectorSubtract(rayEnd, rayStart);
    var length = VectorLength(dir[0], dir[1], dir[2]);
    dir = VectorNormalize(dir);

    var rangeAlong = VectorDot(dir, to);
    if (rangeAlong < 0.0)
    {
        return rayStart;
    }
    if (rangeAlong > length)
    {
        return rayEnd;
    }
    return VectorAdd(rayStart, VectorMultiply(dir, [rangeAlong, rangeAlong, rangeAlong]));
}

ui.add_slider("Offensive   -   Defensive", "dttype", 0, 1);
ui.add_checkbox("Doubletap AA", "dtaa");
ui.add_slider("AA Speed", 'aaspeed', 1, 5);
ui.add_slider("Minimal AA delta", 'mindelta', 0, 41);
ui.add_checkbox("Custom lag", "lag");
ui.add_slider("Custom lag laglimit", "claglaglimit", 1, 13);

register_callback("ragebot_fire", function () {
	if (dtwaiting) if (global_vars.tick_count() - dttime < interval) if (global_vars.tick_count() - dttime > 3) dttime = interval - 10;
	if (vars.is_bind_active("doubletap")) {
		if (vars.is_bind_active("doubletap")) {
			vars.set_bind_active("doubletap", false);
			vars.set_int("antiaim.fakelag", 1);
			dttime = global_vars.tick_count();
			dtwaiting = true;
			if (!vars.is_bind_active("peek_assist")) if (vars.get_int("js.dttype") == 1) cheat.execute_command("+duck");
		}
	}
	if (!dtwaiting) if (!vars.is_bind_active("doubletap")) if (vars.is_bind_active("hide_shots")) {
		aatick = 3;
		vars.set_int("antiaim.trigger[0].yaw_add", 11+(28*k));
		vars.set_int("antiaim.trigger[0].desync_amount", 11+random_int(0, 12));
	}
	//if (vars.is_bind_active("fake_duck")) {
	//	fdwaiting = true;
	//}
});

var kuda = [0, 0, 0]
var otkuda = [0, 0, 0]
var kto = -1
var body = [0, 0, 0]
var feet = [0, 0, 0]
var dist = -1
var brutelist = []

function isEnemy(id) {
    for (var i = 0; i < entity.get_enemies().length; i++) {
        if (entity.get_enemies()[i] === id) {
            return true;
        }
    }
    return false;
}

register_callback("bullet_impact", function () {
	dist = -1;
	kto = entity.get_player_for_user_id(current_event.get_int("userid"));
	if (kto != entity.get_local_player()) body = [entity.get_origin(entity.get_local_player())[0], entity.get_origin(entity.get_local_player())[1], entity.get_origin(entity.get_local_player())[2]+50];
	if (kto != entity.get_local_player()) feet = [entity.get_origin(entity.get_local_player())[0], entity.get_origin(entity.get_local_player())[1], entity.get_origin(entity.get_local_player())[2]];
	if (kto != entity.get_local_player()) kuda = [current_event.get_int('x'), current_event.get_int('y'), current_event.get_int('z')];
	if (kto != entity.get_local_player()) otkuda = [entity.get_origin(kto)[0], entity.get_origin(kto)[1], entity.get_origin(kto)[2]+50];
	if (Math.sqrt(Math.pow(ClosestPointOnRay(body, otkuda, kuda)[0]-body[0], 2)+Math.pow(ClosestPointOnRay(body, otkuda, kuda)[1]-body[1], 2)+Math.pow(ClosestPointOnRay(body, otkuda, kuda)[2]-body[2], 2)) < 100) {
		dist = Math.sqrt(Math.pow(ClosestPointOnRay(body, otkuda, kuda)[0]-body[0], 2)+Math.pow(ClosestPointOnRay(body, otkuda, kuda)[1]-body[1], 2)+Math.pow(ClosestPointOnRay(body, otkuda, kuda)[2]-body[2], 2));
	}
	if (Math.sqrt(Math.pow(ClosestPointOnRay(feet, otkuda, kuda)[0]-feet[0], 2)+Math.pow(ClosestPointOnRay(feet, otkuda, kuda)[1]-feet[1], 2)+Math.pow(ClosestPointOnRay(feet, otkuda, kuda)[2]-feet[2], 2)) < 100) {
		if (dist == -1) dist = Math.sqrt(Math.pow(ClosestPointOnRay(feet, otkuda, kuda)[0]-feet[0], 2)+Math.pow(ClosestPointOnRay(feet, otkuda, kuda)[1]-feet[1], 2)+Math.pow(ClosestPointOnRay(feet, otkuda, kuda)[2]-feet[2], 2));
		if (dist > Math.sqrt(Math.pow(ClosestPointOnRay(feet, otkuda, kuda)[0]-feet[0], 2)+Math.pow(ClosestPointOnRay(feet, otkuda, kuda)[1]-feet[1], 2)+Math.pow(ClosestPointOnRay(feet, otkuda, kuda)[2]-feet[2], 2))) dist = Math.sqrt(Math.pow(ClosestPointOnRay(feet, otkuda, kuda)[0]-feet[0], 2)+Math.pow(ClosestPointOnRay(feet, otkuda, kuda)[1]-feet[1], 2)+Math.pow(ClosestPointOnRay(feet, otkuda, kuda)[2]-feet[2], 2));
	}
	if (dist != -1) {
		bruteyaw = vars.get_int("antiaim.trigger[0].yaw_add");
		aatick += 2;
		if (aatick > 1) aatick = 1;
		if (kto != entity.get_local_player()) brutelist.push(kto);
		if (step == 0) ResetAA();
		if (step == 0) step = 1;	
		if (step == 6) {
			step = 0;
			aatick = 1;
			brutek1 = 1;
			brutek2 = 1;
			brutek3 = 1;
			brutek4 = 1;
			brutek5 = -1/4;
			brutek6 = 1;
		}
		
		if (step == 5) {
			step++;
			aatick = 1;
			brutek1 = 1;
			brutek2 = 1;
			brutek3 = -3;
			brutek4 = 3;
			brutek5 = 2;
			brutek6 = 1;
		}
		
		if (step == 4) {
			step++;
			aatick = 1;
			brutek1 = 1/2;
			brutek2 = 1/3;
			brutek3 = -5/2;
			brutek4 = 1;
			brutek5 = 0;
			brutek6 = -1/5;
		}
		
		if (step == 3) {
			step++;
			aatick = 1;
			brutek1 = 2;
			brutek2 = -1;
			brutek3 = 6;
			brutek4 = 1;
			brutek5 = 1;
			brutek6 = 0;
		}

		if (step == 2) {
			step++;
			aatick = 1;
			brutek1 = 1;
			brutek2 = 1;
			brutek3 = 3;
			brutek4 = 1;
			brutek5 = 0;
			brutek6 = 1;
		}
		
		if (step == 1) {
			step++;
			aatick = 1;
			brutek1 = 1;
			brutek2 = 1;
			brutek3 = -1;
			brutek4 = 1;
			brutek5 = 1;
			brutek6 = 0;
		}
	}
});

//register_callback("render", function () {
//	render.line(render.world_to_screen(ClosestPointOnRay(body, otkuda, kuda)), render.world_to_screen(body), [0, 0, 255, 255], 1);
//	render.line(render.world_to_screen(ClosestPointOnRay(feet, otkuda, kuda)), render.world_to_screen(feet), [0, 255, 255, 255], 1);
//	render.line(render.world_to_screen(otkuda), render.world_to_screen(kuda), [0, 255, 0, 255], 1);
//});

function ResetAA() {
	aatick = 1;
	step = 0;
	brutek1 = 1;
	brutek2 = 1;
	brutek3 = 0;
	brutek4 = 0;
	brutek5 = 0;
	brutek6 = 0;
	k = 1;
	bruteyaw = 0;
}

register_callback("weapon_fire", function () {
	if (!vars.get_bool("misc.slidewalk")) vars.set_bool("misc.slidewalk", true);
	aatick += 2;
	var tmp = brutek1;
	brutek1 = brutek2;
	brutek2 = tmp;
});

register_callback("player_death", function () {
	if (entity.get_player_for_user_id(current_event.get_int("attacker")) == entity.get_local_player()) ResetAA();
	if (entity.get_player_for_user_id(current_event.get_int("userid")) == entity.get_local_player()) ResetAA();
	//const index = brutelist.indexOf(entity.get_player_for_user_id(current_event.get_int("userid")));
	//if (index != -1) brutelist.splice(index, 1);
});

register_callback("createmove", function () {

	if (entity.get_enemies().length <= 0) ResetAA();

	vel = entity.get_velocity(entity.get_local_player());
	velhor = Math.floor(Math.sqrt(vel[0]*vel[0] + vel[1]*vel[1]));
	velvert = Math.floor(vel[2]);

	if (global_vars.tick_count() - aatime == global_vars.tick_count()) {
		aatime = global_vars.tick_count();
	}

	if (vars.get_bool("js.lag")) if (global_vars.tick_count() - lagtime == global_vars.tick_count()) {
		laglimit = math.random_int(vars.get_int("js.claglaglimit")/2, vars.get_int("js.claglaglimit"));
		lagtime = global_vars.tick_count();
	}

	if (vars.get_bool("js.dtaa")) if (vars.is_bind_active("doubletap")) {
		//var angle = Math.ceil(Math.asin()*180/Math.PI);
		if (!vars.get_bool("antiaim.attarget")) vars.set_bool("antiaim.attarget", false);
		if (vars.get_int("antiaim.trigger[0].yaw_add") != 11) vars.set_int("antiaim.trigger[0].yaw_add", 11);
		//if (vel[0] > 1) if (vel[1] > 1) cheat.log(Math.acos(Math.floor(0)));

	}

	if (!dtwaiting) {
		if (vars.get_bool("js.lag")) if (!vars.is_bind_active("hide_shots")) {
			if (global_vars.tick_count() - lagtime >= laglimit) {
				vars.set_int("antiaim.fakelag", 0);
				aamade = true;
			}
			if (global_vars.tick_count() - lagtime >= laglimit+1) {
				lagtime = 0;
				if (vars.get_bool("antiaim.fakelag_when_standing")) vars.set_int("antiaim.fakelag", 1); else if (velhor > 30) vars.set_int("antiaim.fakelag", 1);
			}
		}
		if (!vars.get_bool("antiaim.attarget")) vars.set_bool("antiaim.attarget", true);
		if (global_vars.tick_count() - aatime >= time) {
			time = math.random_int(1, 8-vars.get_int("js.aaspeed"));
			if (vars.get_bool("misc.slidewalk")) vars.set_bool("misc.slidewalk", false);
			aatime = 0;
			aamade = false;
			if (brutelist.length == 0) ResetAA();
			if (aatick == 1 && !aamade) {
				aatick++;
				aamade = true;
				if (vars.get_bool("misc.slidewalk")) vars.set_bool("misc.slidewalk", false);
				if (10 * Math.abs(Math.sin(64*global_vars.realtime())) > 6) {
					if (vars.is_bind_active("inverter")) {
						vars.set_bind_active("inverter", false);
						k = 1*brutek1;
					} else {
						vars.set_bind_active("inverter", true);
						k = -1*brutek2;
					}
				}
				newsync = math.random_int(17, 27)*2;
				newyaw = Math.ceil(newsync*k/2 + k*3 + 2*brutek1);
				if (Math.abs(vars.get_int("antiaim.trigger[0].yaw_add") - newyaw) < vars.get_int("js.mindelta")) newsync = math.random_int(17, 27)*2;
				if (Math.abs(vars.get_int("antiaim.trigger[0].yaw_add") - newyaw) < vars.get_int("js.mindelta")) newsync = math.random_int(17, 27)*2;
				if (Math.abs(vars.get_int("antiaim.trigger[0].yaw_add") - newyaw) < vars.get_int("js.mindelta")) newsync = math.random_int(17, 27)*2;
				if (Math.abs(bruteyaw - newyaw) < 5) newsync = math.random_int(17, 27)*2;
				vars.set_int("antiaim.trigger[0].desync_amount", Math.ceil(newsync));
				if (cheat.get_choked_commands() < 5) {
					vars.set_int("antiaim.trigger[0].jitter_angle", 0);
					vars.set_int("antiaim.trigger[0].yaw_add", Math.floor((vars.get_int("antiaim.trigger[0].desync_amount")/2 + 3 + 2*brutek3)*k));
				} else {
					vars.set_int("antiaim.trigger[0].jitter_angle", vars.get_int("antiaim.trigger[0].jitter_angle")*k + k);
					vars.set_int("antiaim.trigger[0].yaw_add", 11);
				}
			}
			if (aatick == 2 && !aamade) {
				aatick++;
				aamade = true;
				if (10 * Math.abs(Math.sin(64*global_vars.realtime())) > 6) {
					if (vars.is_bind_active("inverter")) {
						vars.set_bind_active("inverter", false);
						k = 1*brutek1;
					} else {
						vars.set_bind_active("inverter", true);
						k = -1*brutek2;
					}
				}
				newsync = math.random_int(12, 27)*2;
				newyaw = Math.ceil(newsync*k/2 + k*3 + 2*brutek1);
				if (Math.abs(vars.get_int("antiaim.trigger[0].yaw_add") - newyaw) < vars.get_int("js.mindelta")) newsync = math.random_int(12, 27)*2;
				if (Math.abs(vars.get_int("antiaim.trigger[0].yaw_add") - newyaw) < vars.get_int("js.mindelta")) newsync = math.random_int(12, 27)*2;
				if (Math.abs(vars.get_int("antiaim.trigger[0].yaw_add") - newyaw) < vars.get_int("js.mindelta")) newsync = math.random_int(12, 27)*2;
				if (Math.abs(bruteyaw - newyaw) < 5) newsync = math.random_int(12, 27)*2;
				vars.set_int("antiaim.trigger[0].desync_amount", Math.ceil(newsync));
				if (cheat.get_choked_commands() < 5) {
					vars.set_int("antiaim.trigger[0].jitter_angle", 0);
					vars.set_int("antiaim.trigger[0].yaw_add", Math.floor((vars.get_int("antiaim.trigger[0].desync_amount")/2 + 3 + 2*brutek3)*k));
				} else {
					vars.set_int("antiaim.trigger[0].jitter_angle", vars.get_int("antiaim.trigger[0].jitter_angle")*k + k);
					vars.set_int("antiaim.trigger[0].yaw_add", 11);
				}
			}
			if (aatick == 3 && !aamade) {
				aatick++;
				aamade = true;
				if (10 * Math.abs(Math.sin(64*global_vars.realtime())) > 6) {
					if (vars.is_bind_active("inverter")) {
						vars.set_bind_active("inverter", false);
						k = 1*brutek1;
					} else {
						vars.set_bind_active("inverter", true);
						k = -1*brutek2;
					}
				}
				newsync = math.random_int(17, 23)*2;
				newyaw = Math.ceil(newsync*k/2 + k*3 + 2*brutek1);
				if (Math.abs(vars.get_int("antiaim.trigger[0].yaw_add") - newyaw) < vars.get_int("js.mindelta")) newsync = math.random_int(17, 23)*2;
				if (Math.abs(vars.get_int("antiaim.trigger[0].yaw_add") - newyaw) < vars.get_int("js.mindelta")) newsync = math.random_int(17, 23)*2;
				if (Math.abs(vars.get_int("antiaim.trigger[0].yaw_add") - newyaw) < vars.get_int("js.mindelta")) newsync = math.random_int(17, 23)*2;
				if (Math.abs(bruteyaw - newyaw) < 5) newsync = math.random_int(17, 23)*2;
				vars.set_int("antiaim.trigger[0].desync_amount", Math.ceil(newsync));
				if (cheat.get_choked_commands() < 5) {
					vars.set_int("antiaim.trigger[0].jitter_angle", 0);
					vars.set_int("antiaim.trigger[0].yaw_add", Math.floor((vars.get_int("antiaim.trigger[0].desync_amount")/2 + 3 + 2*brutek3)*k));
				} else {
					vars.set_int("antiaim.trigger[0].jitter_angle", vars.get_int("antiaim.trigger[0].jitter_angle")*k + k);
					vars.set_int("antiaim.trigger[0].yaw_add", 11);
				}
			}
			if (aatick >= 4 && !aamade) {
				aatick = 1;
				aamade = true;
				vars.set_int("antiaim.roll", 0);
				if (10 * Math.abs(Math.sin(64*global_vars.realtime())) > 6) {
					if (vars.is_bind_active("inverter")) {
						vars.set_bind_active("inverter", false);
						k = 1*brutek1;
					} else {
						vars.set_bind_active("inverter", true);
						k = -1*brutek2;
					}
				}
				newsync = math.random_int(27, 33)*2;
				newyaw = Math.ceil(newsync*k/2 + k*3 + 2*brutek1);
				if (Math.abs(vars.get_int("antiaim.trigger[0].yaw_add") - newyaw) < vars.get_int("js.mindelta")) newsync = math.random_int(27, 33)*2;
				if (Math.abs(vars.get_int("antiaim.trigger[0].yaw_add") - newyaw) < vars.get_int("js.mindelta")) newsync = math.random_int(27, 33)*2;
				if (Math.abs(vars.get_int("antiaim.trigger[0].yaw_add") - newyaw) < vars.get_int("js.mindelta")) newsync = math.random_int(27, 33)*2;
				if (Math.abs(bruteyaw - newyaw) < 5) newsync = math.random_int(27, 33)*2;
				vars.set_int("antiaim.trigger[0].desync_amount", Math.ceil(newsync));
				if (cheat.get_choked_commands() < 5) {
					vars.set_int("antiaim.trigger[0].jitter_angle", 0);
					vars.set_int("antiaim.trigger[0].yaw_add", Math.floor((vars.get_int("antiaim.trigger[0].desync_amount")/2 + 3 + 2*brutek3)*k));
				} else {
					vars.set_int("antiaim.trigger[0].jitter_angle", vars.get_int("antiaim.trigger[0].jitter_angle")*k + k);
					vars.set_int("antiaim.trigger[0].yaw_add", 11);
				}
			}
		}
	}
	if (dtwaiting) {
		if (vars.get_int("js.dttype") == 1) {

			interval = 19;

			if (global_vars.tick_count() - dttime >= 3) {
				vars.set_bool("ragebot.weapons[1].quickstop", false);
				vars.set_bool("ragebot.weapons[2].quickstop", false);
				vars.set_bool("ragebot.weapons[3].quickstop", false);
				vars.set_bool("ragebot.weapons[5].quickstop", false);
				vars.set_bool("ragebot.weapons[6].quickstop", false);
				if (vars.is_bind_active("inverter")) {
					vars.set_bind_active("inverter", false);
				} else {
					vars.set_bind_active("inverter", true);
				}
			}
			if (global_vars.tick_count() - dttime >= interval) {
				vars.set_bool("ragebot.weapons[1].quickstop", true);
				vars.set_bool("ragebot.weapons[2].quickstop", true);
				vars.set_bool("ragebot.weapons[3].quickstop", true);
				vars.set_bool("ragebot.weapons[5].quickstop", true);
				vars.set_bool("ragebot.weapons[6].quickstop", true);
				if (vars.is_bind_active("inverter")) {
					vars.set_bind_active("inverter", false);
				} else {
					vars.set_bind_active("inverter", true);
				}
				cheat.execute_command("-duck");
			}
			if (global_vars.tick_count() - dttime >= interval+3) {
				vars.set_bind_active("doubletap", true);
				vars.set_int("antiaim.fakelag", 0);
				dtwaiting = false;
			}
		} else {
			interval = 13;

			if (global_vars.tick_count() - dttime >= interval) {
				vars.set_bind_active("doubletap", true);
				vars.set_int("antiaim.fakelag", 0);
				dtwaiting = false;
			}
		}
	}
	//if (fdwaiting) {
	//	if (global_vars.tick_count() - fdtime >= 5) {
	//	}
	//}
});