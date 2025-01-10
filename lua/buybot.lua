ui.add_combo("Rifles", "i_primary", { "None", "Auto", "Scout", "AWP", "Galilar/Famas", "AK47/M4A1", "Sg556/Aug"}, 0)
ui.add_combo("SMGs", "i_smg", { "None", "Mac-10/Mp9", "Mp7/Mp5-sd", "Ump45", "Bizon", "P90"}, 0)
ui.add_combo("Heavy", "i_heavy", { "None", "Nova", "Xm1014", "SawedOFF/Mag7", "M249", "Negev"}, 0)

ui.add_combo("Pistols", "i_secondary", { "None", "Deagle/R8", "Duals", "P250", "Fiveseven/Tec9/Cz75"}, 0)

ui.add_checkbox("Armor", "buy_armor", false)
ui.add_checkbox("Hegrenade", "buy_ha", false)
ui.add_checkbox("Molotov", "buy_molotov", false)
ui.add_checkbox("Smoke", "buy_smoke", false)
ui.add_checkbox("Flashbang", "buy_flash", false)
ui.add_checkbox("Decoy", "buy_decoy", false)
ui.add_checkbox("Defuser", "buy_defuser", false)
ui.add_checkbox("Taser", "buy_taser", false)

local function buy_bot(event)
   if event:get_name() == "round_prestart" then

           --primary

           if ui.get_int("i_primary") == 0 then
              engine.execute_client_cmd(" ")
           end

           if ui.get_int("i_primary") == 1 then
              engine.execute_client_cmd("buy scar20; buy g3sg1")
           end

           if ui.get_int("i_primary") == 2 then
              engine.execute_client_cmd("buy ssg08")
           end

           if ui.get_int("i_primary") == 3 then
               engine.execute_client_cmd("buy awp")
           end

           if ui.get_int("i_primary") == 4 then
               engine.execute_client_cmd("buy galilar; buy famas")
           end

           if ui.get_int("i_primary") == 5 then
               engine.execute_client_cmd("buy ak47; buy m4a1")
           end

           if ui.get_int("i_primary") == 6 then
               engine.execute_client_cmd("buy sg556; buy aug")
           end

           --smgs

           if ui.get_int("i_smg") == 0 then
              engine.execute_client_cmd(" ")
           end

           if ui.get_int("i_smg") == 1 then
              engine.execute_client_cmd("buy mac10; buy mp9")
           end

           if ui.get_int("i_smg") == 2 then
              engine.execute_client_cmd("buy mp7")
           end

           if ui.get_int("i_smg") == 3 then
               engine.execute_client_cmd("buy ump45")
           end

           if ui.get_int("i_smg") == 4 then
               engine.execute_client_cmd("buy bizon")
           end

           if ui.get_int("i_smg") == 5 then
               engine.execute_client_cmd("buy p90")
           end

           --heavy

           if ui.get_int("i_heavy") == 0 then
              engine.execute_client_cmd(" ")
           end

           if ui.get_int("i_heavy") == 1 then
              engine.execute_client_cmd("buy nova")
           end

           if ui.get_int("i_heavy") == 2 then
              engine.execute_client_cmd("buy xm1014")
           end

           if ui.get_int("i_heavy") == 3 then
               engine.execute_client_cmd("buy sawedoff; buy mag7")
           end

           if ui.get_int("i_heavy") == 4 then
               engine.execute_client_cmd("buy m249")
           end

           if ui.get_int("i_heavy") == 5 then
               engine.execute_client_cmd("buy negev")
           end

           -- pistols

           if ui.get_int("i_secondary") == 0 then
              engine.execute_client_cmd(" ")
           end

           if ui.get_int("i_secondary") == 1 then
              engine.execute_client_cmd("buy revolver; buy deagle")
           end

           if ui.get_int("i_secondary") == 2 then
              engine.execute_client_cmd("buy elite")
           end

           if ui.get_int("i_secondary") == 3 then
              engine.execute_client_cmd("buy p250")
           end

           if ui.get_int("i_secondary") == 4 then
              engine.execute_client_cmd("buy tec9; buy fiveseven")
           end

           --misc

           if ui.get_bool("buy_armor") then
             engine.execute_client_cmd("buy vesthelm; buy vest")
           end

           if ui.get_bool("buy_ha") then
             engine.execute_client_cmd("buy hegrenade")
           end

           if ui.get_bool("buy_molotov") then
             engine.execute_client_cmd("buy molotov; buy incgrenade")
           end

           if ui.get_bool("buy_smoke") then
             engine.execute_client_cmd("buy smokegrenade")
           end

           if ui.get_bool("buy_flash") then
             engine.execute_client_cmd("buy flashbang")
           end

           if ui.get_bool("buy_decoy") then
             engine.execute_client_cmd("buy decoy")
           end

           if ui.get_bool("buy_defuser") then
             engine.execute_client_cmd("buy defuser")
           end

           if ui.get_bool("buy_taser") then
             engine.execute_client_cmd("buy taser")
           end

    end                
end

client.register_callback("fire_game_event", buy_bot)
