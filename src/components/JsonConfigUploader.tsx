import React, { useCallback, useState } from 'react';
import { Upload, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import { HeaderConfig } from '../types/HeaderConfig';

interface JsonConfigUploaderProps {
  onConfigLoaded: (config: HeaderConfig) => void;
  currentConfig: HeaderConfig | null;
}

const JsonConfigUploader: React.FC<JsonConfigUploaderProps> = ({ onConfigLoaded, currentConfig }) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        console.log(jsonData)
        // Validate required fields
        if (!jsonData.header) {
          throw new Error('Missing "header" object in JSON config');
        }

        const header = jsonData.header;
        if (!header.logo || !header.companyName || !header.companyAddress || !header.companyEmail || !header.signature || !header.stamp) {
          throw new Error('Missing required header fields: logo, companyName, companyAddress, companyEmail, signature, stamp');
        }

        const headerConfig: HeaderConfig = {
          logo: header.logo,
          companyName: header.companyName,
          companyAddress: header.companyAddress,
          companyEmail: header.companyEmail,
          signature: header.signature,
          stamp: header.stamp
        };

        onConfigLoaded(headerConfig);
        setUploadStatus('success');
        setErrorMessage('');
      } catch (error) {
        console.error('Error parsing JSON config:', error);
        setUploadStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Invalid JSON format');
      }
    };
    reader.readAsText(file);
  }, [onConfigLoaded]);

  const downloadSampleConfig = () => {
    const sampleConfig = {
      header: {
        logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
        companyName: "Your Company Name",
        companyAddress: "Your Company Address",
        companyEmail: "contact@yourcompany.com",
        signature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
        stamp: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
      }
    };

    const blob = new Blob([JSON.stringify(sampleConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'header-config-sample.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-6 h-6 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Header Configuration</h3>
        {currentConfig && (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Config Loaded</span>
          </div>
        )}
      </div>

      {currentConfig && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Current Configuration:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Company:</strong> {currentConfig.companyName}</p>
            <p><strong>Address:</strong> {currentConfig.companyAddress}</p>
            <p><strong>Email:</strong> {currentConfig.companyEmail}</p>
            <p><strong>Logo:</strong> {currentConfig.logo.startsWith('data:') ? 'Base64 Image' : 'Image URL'}</p>
            <p><strong>Signature:</strong> {currentConfig.signature.startsWith('data:') ? 'Base64 Image' : 'Image URL'}</p>
            <p><strong>Stamp:</strong> {currentConfig.stamp.startsWith('data:') ? 'Base64 Image' : 'Image URL'}</p>
          </div>
        </div>
      )}

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          Upload a JSON configuration file to customize the invoice header with your company information and logo.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <label className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-150 cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload JSON Config
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={downloadSampleConfig}
            className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-150"
          >
            <Settings className="w-4 h-4" />
            Download Sample
          </button>
        </div>

        {uploadStatus === 'success' && (
          <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>Configuration loaded successfully!</span>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="mt-4 flex items-center justify-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>Error: {errorMessage}</span>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500">
          <p>Required JSON structure:</p>
          <pre className="bg-gray-100 p-2 rounded text-left mt-2 overflow-x-auto">
{`{
  "header": {
    "logo": "base64_image_or_url",
    "companyName": "Company Name",
    "companyAddress": "Address Line",
    "companyEmail": "email@company.com",
    "signature": "base64_image_or_url",
    "stamp": "base64_image_or_url"
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default JsonConfigUploader;