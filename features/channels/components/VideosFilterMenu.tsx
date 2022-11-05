import React, { useState } from "react";
import { VideoFilters } from "features/channels/types";

interface YouTubeFilterMenuProps {
  setFilters: React.Dispatch<React.SetStateAction<VideoFilters | null>>;
}

export const VideosFilterMenu = ({ setFilters }: YouTubeFilterMenuProps) => {
  const [showFilters, setShowFilters] = useState(false);

  // Unique states are used for each filter within this component to avoid causing a re-render of the parent component on any filter change
  const [keyword, setKeyword] = useState("");
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(180000);
  const [date, setDate] = useState(new Date());

  // Convenience function used when a radio button is clicked. It allows easy min/max setting in one function call
  const setDuration = (minDuration: number, maxDuration: number) => {
    setMinDuration(minDuration);
    setMaxDuration(maxDuration);
  };

  const applyFilters = () => {
    setFilters({
      keywordFilter: keyword,
      minDurationFilter: minDuration,
      maxDurationFilter: maxDuration,
      dateFilter: date,
    });
  };

  return (
    <div>
      {/*Expand and collapse the filter menu*/}
      <button onClick={() => setShowFilters((prevState) => !prevState)}>
        Filters
      </button>

      {showFilters && (
        <div>
          <div>
            <h4>Upload date</h4>
            <label htmlFor="date">Uploaded before date</label>
            <input
              type="date"
              id="date"
              value={date.toLocaleDateString("en-CA")}
              onChange={(e) => setDate(new Date(e.target.valueAsNumber))}
            />
          </div>
          <div>
            <h4>Duration</h4>
            <fieldset>
              <legend>Select a duration</legend>
              <div>
                <input
                  type="radio"
                  id="anyDuration"
                  name="duration"
                  onChange={() => setDuration(0, 180000)}
                  checked={minDuration === 0 && maxDuration === 180000}
                />
                <label htmlFor="anyDuration">Any duration</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="durationOne"
                  name="duration"
                  onChange={() => setDuration(0, 300)}
                />
                <label htmlFor="durationOne">Under 5 minutes</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="durationTwo"
                  name="duration"
                  onChange={() => setDuration(300, 3600)}
                />
                <label htmlFor="durationTwo">5 - 60 minutes</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="durationThree"
                  name="duration"
                  onChange={() => setDuration(3600, 14400)}
                />
                <label htmlFor="durationThree">1 - 4 hours</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="durationFour"
                  name="duration"
                  onChange={() => setDuration(14400, 180000)}
                />
                <label htmlFor="durationFour">Over 4 hours</label>
              </div>
            </fieldset>
          </div>
          <div>
            <h4>Keyword Search</h4>
            <label htmlFor="keyword">Keyword</label>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <button onClick={applyFilters}>Apply filters</button>
        </div>
      )}
    </div>
  );
};
