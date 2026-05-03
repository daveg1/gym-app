import { useRef } from "react";
import { ExportIcon, ImportIcon } from "../../components/icons";
import { NavBar } from "../../components/shared";
import { Button, Footer, Header, List, Page, Text } from "../../components/ui";
import { SectionCard } from "../../components/ui/section-card";
import { useStorage } from "../../hooks";

export function SettingsView() {
  const { doExport, doImport } = useStorage();
  const fileInputRef = useRef<HTMLInputElement>(null!);

  const openImportFile = () => {
    fileInputRef.current.click();
  };

  const handleImport = async () => {
    const files = fileInputRef.current.files;
    if (!files || files.length < 1) {
      return; // todo: user feedback
    }

    try {
      await doImport(files[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleExport = async () => {
    try {
      await doExport();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page>
      <Header text="Settings" />

      <List>
        <SectionCard title="Backups">
          <div className="flex flex-col gap-3">
            <Text>
              WARNING: This is experimental and may result in data loss.
            </Text>

            <Button
              className="flex items-center justify-center gap-2"
              onClick={() => openImportFile()}
            >
              <ImportIcon />
              <span>Import data</span>
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              className="sr-only"
              hidden
              onChange={() => handleImport()}
            />

            <Button
              className="flex items-center justify-center gap-2"
              onClick={() => handleExport()}
            >
              <ExportIcon />
              <span>Export data</span>
            </Button>
          </div>
        </SectionCard>
      </List>

      <Footer>
        <NavBar />
      </Footer>
    </Page>
  );
}
