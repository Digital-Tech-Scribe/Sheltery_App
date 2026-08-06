import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Info.css";

export function Info() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {});
    return () => ctx.revert();
  }, []);

  return (
    <div className="info">
      <div className="info-bg img-float">
        <img src="/assets/luxury-walkway.jpg" alt="" />
      </div>

      <div className="info-top reveal">
        <h2>
          <div className="text-wrap">
            <div className="text-inner">The Sheltery Properties</div>
          </div>
        </h2>
        <div className="subheading">
          <div className="text-wrap">
            <div className="text-inner">Lagos Real Estate Disciplined Focus</div>
          </div>
        </div>
      </div>

      <div className="info-content">
        <div className="line-wrap line-reveal">
          <div className="line-dash" />
        </div>

        <div className="info-block">
          <div className="info-text">
            The Sheltery's goal is to provide attractive housing for tenants seeking a safe environment they can be proud of. We focus on Lagos prime locations, representing a significant piece of the market where we expect to find opportunities.
          </div>
          <a href="#contact" className="link-flash">The Sheltery Properties</a>
        </div>

        <div className="info-img img-float">
          <img src="/assets/hero-lagos.jpg" alt="" />
        </div>

        <div className="invest-info">
          <div className="invest-info-top reveal">
            <h2>
              <div className="text-wrap">
                <div className="text-inner">The Sheltery Property Approach</div>
              </div>
            </h2>
            <div className="subheading">
              <div className="text-wrap">
                <div className="text-inner">Real Estate Opportunity and Value-Driven Advisory</div>
              </div>
            </div>
          </div>

          <div className="invest-info-block">
            <div className="invest-info-img img-float">
              <img src="/assets/founder-portrait.jpg" alt="" />
            </div>
            <div className="invest-info-content">
              <div className="invest-info-text">
                It will take patience and rigorous due diligence to find the right opportunities for The Sheltery to capitalize on. We will not be rushed or compromise our economic goals and philosophies. Our founder invests directly in every property decision, so clients can be assured that there is commonality of interest in the goals of The Sheltery's property investments and management.
              </div>
              <a href="#contact" className="link-flash">The Sheltery Properties</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
