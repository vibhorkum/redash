import { isString, map, uniq, flatten, filter, sortBy, keys } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const MappingTypes = {
  x: { label: 'X Column' },
  y: { label: 'Y Columns', multiple: true },
  series: { label: 'Group by' },
  yError: { label: 'Errors column' },
  size: { label: 'Bubble size column' },
  zVal: { label: 'Color Column' },
};

export default function ColumnMappingSelect({ value, availableColumns, type, onChange }) {
  const options = sortBy(filter(
    uniq(flatten([availableColumns, value])),
    v => isString(v) && (v !== ''),
  ));
  const { label, multiple } = MappingTypes[type];

  return (
    <div className="m-b-15">
      <label htmlFor={`chart-editor-column-mapping-${type}`}>{label}</label>
      <Select
        id={`chart-editor-column-mapping-${type}`}
        className="w-100"
        data-test={`Chart.ColumnMapping.${type}`}
        mode={multiple ? 'multiple' : 'default'}
        allowClear
        placeholder={multiple ? 'Choose columns...' : 'Choose column...'}
        value={value || undefined}
        onChange={column => onChange(column || null, type)}
      >
        {map(options, c => (
          <Select.Option key={c} value={c} data-test={`Chart.ColumnMapping.${type}.${c}`}>{c}</Select.Option>
        ))}
      </Select>
    </div>
  );
}

ColumnMappingSelect.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  availableColumns: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf(keys(MappingTypes)),
  onChange: PropTypes.func,
};

ColumnMappingSelect.defaultProps = {
  value: null,
  availableColumns: [],
  type: null,
  onChange: () => {},
};

ColumnMappingSelect.MappingTypes = MappingTypes;
