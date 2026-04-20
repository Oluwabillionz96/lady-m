import { SettingsData } from "@/lib/actions/settings";
import { Edit2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { SettingCards } from "./settings-form";

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
        {settingCards.slice(0, 4).map((setting) => {
          const Icon = setting.icon;
          return (
            <div
              key={setting.key}
              className="bg-luxury-light rounded-lg border border-luxury-accent/20 p-4 hover:border-luxury-accent/40 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="p-2 bg-luxury-dark rounded-lg shrink-0">
                    <Icon className="w-4 h-4 text-luxury-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-luxury-text-muted mb-1">
                      {setting.label}
                    </p>
                    <p className="text-luxury-text font-medium wrap-break-word">
                      {setting.value || (
                        <span className="text-luxury-text-muted italic">
                          Not set
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingKey(setting.key)}
                  className="p-2 text-luxury-text-muted hover:text-luxury-accent transition-colors shrink-0"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsContactInfo;
