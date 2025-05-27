import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';

import type { TextSettings, TextSize, TextColor, TextBold } from "../book";
import { useAppDispatch, useAppSelector } from '../../store';
import { selectTheme } from '../../features/theme/themeSelectors';
import { toggleTheme } from '../../features/theme/themeSlice';
import { clearFavorites } from '../../features/favorites/favoritesSlice';


const defaultTextSettings: TextSettings = {
  size: localStorage.getItem('bookTextSize') as TextSize ?? 'medium',
  color: localStorage.getItem('bookTextColor') as TextColor ?? 'dark blue',
  isBold: localStorage.getItem('bookTextIsBold') as TextBold ?? 'false',
};

const SIZES: TextSize[] = ['small', 'medium', 'large'] as const;
const COLORS: TextColor[] = ['black', 'dark blue', 'sepia'] as const;

function Settings() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const [textSettings, setTextSettings] = useState<TextSettings>(defaultTextSettings);

  const confirm = () => {
    confirmDialog({
      message: 'Are you sure?',
      header: 'Confirm your action.',
      icon: 'pi pi-exclamation-triangle',
      accept: () => dispatch(clearFavorites()),
      reject: () => {},
    });
  }

  useEffect(() => {
    localStorage.setItem('bookTextSize', textSettings.size);
    localStorage.setItem('bookTextColor', textSettings.color);
    localStorage.setItem('bookTextIsBold', textSettings.isBold);
  }, [textSettings]);

  return (
    <div className="settings">
      <h1>Settings</h1>

      <div className="mb-3">
        <label htmlFor="theme" className="form-label">Theme:</label>
        <Dropdown 
          name="theme"
          value={theme}
          onChange={() => dispatch(toggleTheme())} 
          options={['dark', 'light']}
        />
      </div>
      <div className="mb-3 mt-5">
        <Button
          name="clear-favorites"
          onClick={confirm}
        >Clear favorites</Button>
        <ConfirmDialog />
      </div>
      <div className="fonts mt-5">
        <div className="mb-3">
          <label htmlFor="font-size" className="form-label">Size:</label>
          <Dropdown
            name="font-size"
            value={textSettings.size}
            onChange={(e) => setTextSettings(settings => { 
              return { 
                ...settings, 
                size: e.value, 
              };
            })} 
            options={SIZES}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">Color:</label>
          <Dropdown
            name="color"
            value={textSettings.color}
            onChange={(e) => setTextSettings(settings => { 
              return { 
                ...settings, 
                color: e.value, 
              };
            })} 
            options={COLORS}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="is-bold" className="form-label">Is bold:</label>
          <Checkbox
            name="is-bold"
            checked={textSettings.isBold === 'true'}
            onChange={() => setTextSettings(settings => { 
              return { 
                ...settings, 
                isBold: settings.isBold === 'true' ? 'false' : 'true', 
              };
            })} 
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;