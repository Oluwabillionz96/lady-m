import { SettingCards } from "./settings-form";
import { Dispatch, SetStateAction } from "react";
import { SettingsData } from "@/lib/actions/settings";
import { SettingCard } from "./setting-card";

const SettingsContactInfo = ({
  settingCards,
  setEditingKey,
}: {
  settingCards: SettingCards;
  setEditingKey: Dispatch<SetStateAction<keyof SettingsData | null>>;
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-luxury-text mb-4">
        Contact Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingCards.slice(0, 4).map((setting) => (
          <SettingCard
            key={setting.key}
            icon={setting.icon}
            label={setting.label}
            value={setting.value}
            onEdit={() => setEditingKey(setting.key)}
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsContactInfo;
