import { shallow } from 'enzyme';
import { PBikesListing } from './BikesListing';
import React from 'react'
import { DateRangePicker } from 'react-dates';
import Title from '../text/Title';
import { EnhancedBikeFilterForm } from '../forms/BikeFilterForm/EnhancedBikeFilterForm';
import BikesTable from '../tables/BikesTable/BikesTable';
import axios from "axios";
jest.mock('axios');
// const flushPromises = () => {
//     return new Promise(resolve => {
//         setTimeout(resolve, 0);
//     });
// };

describe('<PBikesListing />', () => {
    beforeEach(() => {
        axios.get.mockImplementation(() => Promise.resolve({
            data: [{ id: 1, title: "title 1" }, { id: 2, title: "title 2" }]
        }))
    })
    // beforeEach(async() => {
        // await flushPromises();
    // })
    it('should render 1 <DateRangePicker /> components', () => {
        const wrapper = shallow(<PBikesListing />);
        expect(wrapper.find(DateRangePicker).length).toBe(1);
    });

      it('should render 1 <Title /> components', () => {
        const wrapper = shallow(<PBikesListing />);
        expect(wrapper.find(Title).length).toBe(1);
      });

      it('should render 1 <EnhancedBikeFilterForm /> components', () => {
        const wrapper = shallow(<PBikesListing />);
        expect(wrapper.find(EnhancedBikeFilterForm).length).toBe(1);
      });

      it('should render 1 <BikesTable /> components', () => {
        const wrapper = shallow(<PBikesListing />);
        expect(wrapper.find(BikesTable).length).toBe(1);
      });

      it('should render an `.forTest`', () => {
        const wrapper = shallow(<PBikesListing />);
        expect(wrapper.find('.forTest')).toBeTruthy()
      });

    it('should render children when passed in', () => {
        // const wrapper = shallow((
        //   <PBikesListing>
        //     <div className="unique" />
        //   </PBikesListing>
        // ));
        // expect(wrapper.contains(<div className="unique" />)).to.equal(true);
    });

    //   it('simulates click events', () => {
    //     const onButtonClick = sinon.spy();
    //     const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
    //     wrapper.find('button').simulate('click');
    //     expect(onButtonClick.calledOnce).to.equal(true);
    //   });
});