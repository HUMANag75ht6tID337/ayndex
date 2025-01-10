menu.add_check_box("Enable line")
menu.add_slider_int("Line width", 1, 10)
menu.add_check_box("Enable line from top")
menu.add_check_box("Enable line from left")
menu.add_check_box("Enable line from bottom")
menu.add_check_box("Enable line from right")

local function paint()
    if menu.get_bool("Enable line") then   
        local screen_width = engine.get_screen_width()
        local screen_height = engine.get_screen_height()
        local LineWidth = menu.get_int("Line width")
        local r = math.floor(math.sin(globals.get_realtime() * 2) * 127 + 128)
        local g =  math.floor(math.sin(globals.get_realtime() * 2 + 2) * 127 + 128)
        local b = math.floor(math.sin(globals.get_realtime() * 2 + 4) * 127 + 128)

        local startXOffset, startYOffset, WidthOffset, HeightOffset = 0, 0, 0, 0
        if menu.get_bool("Enable line from left") then
            startXOffset = startXOffset + LineWidth
            WidthOffset = WidthOffset - LineWidth
        end
        if menu.get_bool("Enable line from right") then
            WidthOffset = WidthOffset - LineWidth
        end


        if menu.get_bool("Enable line from top") then
             render.draw_rect_filled(startXOffset, 0, screen_width + WidthOffset, LineWidth, color.new(r, g, b, 160))
        end

        if menu.get_bool("Enable line from bottom") then
             render.draw_rect_filled(startXOffset, screen_height - LineWidth, screen_width + WidthOffset, LineWidth, color.new(r, g, b, 160))
        end

        if menu.get_bool("Enable line from left") then
            render.draw_rect_filled(0, 0, LineWidth, screen_height, color.new(r, g, b, 160))
        end

        if menu.get_bool("Enable line from right") then
            render.draw_rect_filled(screen_width - LineWidth, 0, LineWidth, screen_height, color.new(r, g, b, 160))
        end
    end
end

client.add_callback("on_paint", paint)