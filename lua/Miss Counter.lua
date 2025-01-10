local hits, misses_spread, misses_resolver = 0, 0, 0
local font = render.create_font("Verdana", 12, 500, true, true, false)

menu.add_check_box("Enable shot statistic")
menu.add_slider_int("Shot statistic position X", 0, engine.get_screen_width())
menu.add_slider_int("Shot statistic position Y", 0, engine.get_screen_height())

local function shot(shot_info)
    if shot_info.result == "Hit" then
        hits = hits + 1
    elseif shot_info.result == "Spread" then
        misses_spread = misses_spread + 1
    else
        misses_resolver = misses_resolver + 1
    end
end

local function paint()
    if menu.get_bool("Enable shot statistic") then
        local x = menu.get_int("Shot statistic position X")
        local y = menu.get_int("Shot statistic position Y")

        render.draw_rect_filled(x - 1, y - 1, 342, 7, color.new(16, 22, 29, 160))

        if hits > 0 or misses_spread > 0 or misses_resolver > 0 then
            local fired_shots = hits + misses_spread + misses_resolver
        
            local main_hits_percent = math.floor(hits / fired_shots * 100.0 + 0.5)
            local main_misses_spread_percent = math.floor(misses_spread / fired_shots * 100.0 + 0.5)
            local main_misses_resolver_percent = math.floor(misses_resolver / fired_shots * 100.0 + 0.5)

            local main_percents = main_hits_percent + main_misses_spread_percent + main_misses_resolver_percent

            if main_percents ~= 100 then
                main_hits_percent = main_hits_percent + 100 - main_percents
            end

            local hits_percent = math.floor(hits / (hits + misses_spread + misses_resolver) * 340.0 + 0.5)
            local misses_spread_percent = math.floor(misses_spread / (hits + misses_spread + misses_resolver) * 340.0 + 0.5)
            local misses_resolver_percent = math.floor(misses_resolver / (hits + misses_spread + misses_resolver) * 340.0 + 0.5)

            local percents = hits_percent + misses_spread_percent + misses_resolver_percent

            if percents ~= 340 then
                hits_percent = hits_percent + 340 - percents
            end

            local half_width = math.floor((render.get_text_width(font, "HITS: " .. tostring(hits) .. " (" .. tostring(main_hits_percent) .. "%%)") + 340 - render.get_text_width(font, "RESOLVER: " .. tostring(misses_resolver) .. " (" .. tostring(main_misses_resolver_percent) .. "%%)")) * 0.5 + 0.5)
        
            render.draw_text(font, x, y - 16, color.new(94, 230, 75), "HITS: " .. tostring(hits) .. " (" .. tostring(main_hits_percent) .. "%%)")
            render.draw_text_centered(font, x + half_width, y - 16, color.new(118, 171, 255), true, false, "SPREAD: " .. tostring(misses_spread) .. " (" .. tostring(main_misses_spread_percent) .. "%%)")
            render.draw_text(font, x + 340 - render.get_text_width(font, "RESOLVER: " .. tostring(misses_resolver) .. " (" .. tostring(main_misses_resolver_percent) .. "%%)"), y - 16, color.new(245, 127, 23), "RESOLVER: " .. tostring(misses_resolver) .. " (" .. tostring(main_misses_resolver_percent) .. "%%)")

            render.draw_rect_filled(x, y, hits_percent, 5, color.new(94, 230, 75))
            render.draw_rect_filled(x + hits_percent, y, misses_spread_percent, 5, color.new(118, 171, 255))
            render.draw_rect_filled(x + hits_percent + misses_spread_percent, y, misses_resolver_percent, 5, color.new(245, 127, 23))
        else   
            local half_width = math.floor((render.get_text_width(font, "HITS: 0 (0%%)") + 340 - render.get_text_width(font, "RESOLVER: 0 (0%%)")) * 0.5 + 0.5)
        
            render.draw_text(font, x, y - 16, color.new(94, 230, 75), "HITS: 0 (0%%)")
            render.draw_text_centered(font, x + half_width, y - 16, color.new(118, 171, 255), true, false, "SPREAD: 0 (0%%)")
            render.draw_text(font, x + 340 - render.get_text_width(font, "RESOLVER: 0 (0%%)"), y - 16, color.new(245, 127, 23), "RESOLVER: 0 (0%%)")
        end
    end
end

client.add_callback("on_shot", shot)
client.add_callback("on_paint", paint)