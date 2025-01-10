local font = render.create_font("Verdana", 12, 400, true, true, false)

menu.add_check_box("Enable keybind list")
menu.add_slider_int("Key binds position X", 0, engine.get_screen_width())
menu.add_slider_int("Key binds position Y", 0, engine.get_screen_height())

local types = 
{ 
    "hold", 
    "toggled" 
}

local get_state, get_mode = menu.get_key_bind_state, menu.get_key_bind_mode
local screen_x, screen_y = engine.get_screen_width(),engine.get_screen_height()
local count = 0

local function add_bind(name, bind_name, x, y)
    if get_state(bind_name) then
        render.draw_text(font, x + 5, y + 22 + (15 * count), color.new(255, 255, 255), name)     
        text_width = render.get_text_width(font, "[" .. types[get_mode(bind_name) + 1] .. "]")
      
        render.draw_text(font, x + 170 - text_width - 5, y + 22 + (15 * count), color.new(255, 255, 255), "[" .. types[get_mode(bind_name) + 1] .. "]")      
        count = count + 1    
    end
end

local function on_paint()

    if not menu.get_bool("Enable keybind list") then 
        return 
    end

    if not engine.is_in_game() then 
        return 
    end
  
    local color = menu.get_color("Menu.menu_color")
    local pos_x = menu.get_int("Key binds position X")
    local pos_y = menu.get_int("Key binds position Y") 
  
    render.draw_rect_filled(pos_x, pos_y, 170, 22 + (15 * count) + 3, color.new(0, 0, 0, 120)) 
    render.draw_text(font, pos_x + 5, pos_y + 2, color.new(255, 255, 255), "key binds") 
    render.draw_rect_filled(pos_x, pos_y + 19, 170, 2, color)
    
    count = 0
  
    add_bind("Safe points", key_binds.body_aim, pos_x, pos_y)
    add_bind("Damage override", key_binds.damage_override, pos_x, pos_y)
    add_bind("Double tap", key_binds.double_tap, pos_x, pos_y)
    add_bind("Hide shots", key_binds.hide_shots, pos_x, pos_y)
    add_bind("Invert desync", key_binds.flip_desync, pos_x, pos_y)
    add_bind("Thirdperson", key_binds.thirdperson, pos_x, pos_y)
    add_bind("Automatic peek", key_binds.automatic_peek, pos_x, pos_y)
    add_bind("Fake duck", key_binds.fakeduck, pos_x, pos_y)
    add_bind("Slow walk", key_binds.slowwalk, pos_x, pos_y)
    add_bind("Edge jump", key_binds.edge_jump, pos_x, pos_y)
end

client.add_callback("on_paint", on_paint)



